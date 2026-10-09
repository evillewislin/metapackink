/* ------------------------------------------------------------------
   forms.js — progressive enhancement for the enquiry forms.

   Every form on this site works without JavaScript: the <form> has a real
   action and method, so a no-JS visitor gets a normal POST and lands on
   /thank-you/. This script upgrades that experience rather than enabling it.

   What it adds:
     - inline validation with field-level error messages
     - a status message while the request is in flight
     - GA4 generate_lead event on a successful submit
     - a readable filename list for the artwork upload

   Endpoint configuration lives in src/partials.js (FORM_ENDPOINT).
   ------------------------------------------------------------------ */
(function () {
  'use strict';

  var GA_ID = 'G-G4VHR7QHGD';

  function markError(row, on) {
    if (row) row.classList.toggle('has-error', on);
  }

  function validate(form) {
    var ok = true;
    var firstBad = null;

    form.querySelectorAll('[required]').forEach(function (el) {
      var row = el.closest('.form-row');
      var empty =
        el.type === 'checkbox' ? !el.checked : !String(el.value || '').trim();

      /* a business email that clearly is not an email is worth catching here */
      var badEmail = false;
      if (!empty && el.type === 'email') {
        badEmail = !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(el.value.trim());
      }

      var bad = empty || badEmail;
      markError(row, bad);
      if (bad) {
        ok = false;
        if (!firstBad) firstBad = el;
        if (badEmail) {
          var msg = row && row.querySelector('.field-error');
          if (msg) msg.textContent = 'Please enter a valid business email address.';
        }
      }
    });

    if (firstBad) {
      firstBad.focus();
      if (firstBad.scrollIntoView) {
        firstBad.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }
    }
    return ok;
  }

  /**
   * Fallback used when the form endpoint has not been configured, or the
   * request fails. Builds a mailto: so the enquiry is never silently lost.
   */
  function mailtoFallback(form) {
    var data = new FormData(form);
    var lines = [];
    data.forEach(function (value, key) {
      if (key === '_gotcha' || key === 'consent') return;
      if (value instanceof File) {
        if (value.name) lines.push(key + ': ' + value.name + ' (please attach)');
        return;
      }
      if (String(value).trim()) lines.push(key + ': ' + value);
    });

    var subject = 'Packaging enquiry — ' + (data.get('company') || data.get('name') || 'website');
    var href =
      'mailto:sales@metapackink.com' +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(lines.join('\n'));

    window.location.href = href;
  }

  function initForm(form) {
    var status = form.querySelector('.form-status');
    var endpoint = form.getAttribute('action') || '';
    var configured = endpoint && endpoint.indexOf('YOUR_FORM_ID') === -1;

    /* clear the error state as soon as the visitor corrects a field */
    form.addEventListener('input', function (e) {
      var row = e.target.closest && e.target.closest('.form-row');
      if (row) markError(row, false);
      var err = row && row.querySelector('.field-error');
      if (err) err.textContent = 'This field is required.';
    });

    /* file upload: show what was chosen */
    var fileInput = form.querySelector('input[type="file"]');
    var fileNames = form.querySelector('.upload-filenames');
    if (fileInput && fileNames) {
      fileInput.addEventListener('change', function () {
        var names = Array.prototype.map
          .call(fileInput.files, function (f) { return f.name; })
          .join(', ');
        fileNames.textContent = names;
        fileNames.hidden = !names;
      });
    }

    form.addEventListener('submit', function (e) {
      /* honeypot: a real visitor never fills this in */
      if (form.querySelector('[name="_gotcha"]') &&
          form.querySelector('[name="_gotcha"]').value) {
        e.preventDefault();
        return;
      }

      if (!validate(form)) {
        e.preventDefault();
        if (status) {
          status.textContent = 'Please check the highlighted fields.';
          status.classList.add('is-error');
        }
        return;
      }

      if (status) {
        status.classList.remove('is-error');
        status.textContent = 'Sending…';
      }

      /* No endpoint configured: hand the enquiry to the visitor's mail client
         rather than showing a success message for something that went nowhere. */
      if (!configured) {
        e.preventDefault();
        if (status) {
          status.textContent = 'Opening your email client…';
        }
        mailtoFallback(form);
        return;
      }

      e.preventDefault();

      fetch(endpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      })
        .then(function (res) {
          if (!res.ok) throw new Error('Request failed: ' + res.status);

          if (typeof window.gtag === 'function') {
            window.gtag('event', 'generate_lead', {
              form_name: form.getAttribute('data-form-name') || 'unknown',
              transport_type: 'beacon'
            });
          }

          var thanks = form.getAttribute('data-thank-you') || '/thank-you/';
          if (status) status.textContent = 'Thank you — redirecting…';
          window.location.href = thanks;
        })
        .catch(function () {
          if (status) {
            status.textContent =
              'Something went wrong. Please try again, or email sales@metapackink.com directly.';
            status.classList.add('is-error');
          }
        });
    });
  }

  function init() {
    document.querySelectorAll('form[data-rfq]').forEach(initForm);

    /* language memory: the switcher in main.js is session-only, so the site
       forgets the choice on the next page. This is what the cookie policy
       describes as mpk_lang. */
    try {
      var stored = localStorage.getItem('mpk_lang');
      if (stored && window.mpI18n && typeof window.mpI18n.applyLanguage === 'function') {
        window.mpI18n.applyLanguage(stored);
      }
      document.querySelectorAll('.lang-option').forEach(function (btn) {
        btn.addEventListener('click', function () {
          try { localStorage.setItem('mpk_lang', btn.dataset.lang); } catch (e) {}
        });
      });
    } catch (e) {}
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
