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

   Endpoint configuration lives in src/config.js (site.formId). While that is
   still the placeholder, submitting opens the visitor's mail client instead
   of posting anywhere — see mailtoFallback() below for why that is the safer
   default, and README-DEPLOY.md for how to switch it on.
   ------------------------------------------------------------------ */
(function () {
  'use strict';

  var GA_ID = 'G-G4VHR7QHGD';
  var FALLBACK_EMAIL = 'sales@metapackink.com';

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
   *
   * This is a last resort, not the normal path. A mailto: only works if the
   * visitor has a mail client wired up — on a phone or a locked-down desktop
   * it does nothing at all, and the visitor is left staring at a page that
   * appears to have ignored them. That is why the form says so out loud
   * before navigating away, and why the build refuses to ship a placeholder
   * endpoint silently.
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

    /* The forms no longer ask for a name or a company, so the email address is
       the only thing left that identifies the sender. */
    var subject = 'Packaging enquiry — ' + (data.get('email') || 'website');
    var href =
      'mailto:' + FALLBACK_EMAIL +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(lines.join('\n'));

    window.location.href = href;
    return href;
  }

  /* Read from the same attribute the markup carries, so the two can never
     disagree. Falls back to inspecting the URL for older cached HTML. */
  function endpointConfigured(form) {
    var flag = form.getAttribute('data-endpoint-configured');
    if (flag === 'true') return true;
    if (flag === 'false') return false;
    var action = form.getAttribute('action') || '';
    return !!action && action.indexOf('YOUR_FORM_ID') === -1;
  }

  /* ------------------------------------------------------------------
     Country, resolved from the visitor's IP rather than asked for.

     Cloudflare publishes the country of every request at its own
     /cdn-cgi/trace endpoint. That is same-origin, so this needs no third-party
     call, no API key, and no request to a domain the visitor was never told
     about — the platform already knew the answer, this only reads it back.

     Three things it deliberately does not do:

       - It never reads or submits the IP address itself. The country is all
         the business needs; keeping every enquirer's address would be a
         liability with nothing to show for it.
       - It never blocks a submission. If the lookup fails, is blocked by an
         extension, or the visitor is offline, the fields stay empty and the
         form posts exactly as it would have.
       - It never guesses. Cloudflare answers `loc=XX` when it cannot place the
         address and `loc=T1` for a Tor exit node. Neither is a country, and
         writing one into the submission would be worse than writing nothing.
     ------------------------------------------------------------------ */
  var COUNTRY_KEY = 'mpk_country';

  /* ISO 3166-1 alpha-2 -> English name, without shipping a 250-entry table.
     Intl is present in every browser this site supports; the raw code is a
     perfectly good fallback for the ones where it is not. */
  function countryName(code) {
    try {
      var names = new Intl.DisplayNames(['en'], { type: 'region' });
      var name = names.of(code);
      if (name && name !== code) return name;
    } catch (e) { /* no Intl.DisplayNames — the code still travels */ }
    return code;
  }

  function fillCountry(code) {
    var name = countryName(code);
    document.querySelectorAll('[data-country-auto]').forEach(function (input) {
      input.value = input.name === 'country_code' ? code : name;
    });
  }

  function detectCountry() {
    /* Only pages that actually carry a form pay for this. */
    if (!document.querySelector('[data-country-auto]')) return;

    /* One lookup per session: the visitor's country does not change between
       pages, and a second request would be pure waste. */
    try {
      var stored = sessionStorage.getItem(COUNTRY_KEY);
      if (stored) { fillCountry(stored); return; }
    } catch (e) { /* storage disabled — fall through and ask once */ }

    fetch('/cdn-cgi/trace', { cache: 'no-store' })
      .then(function (res) { return res.ok ? res.text() : ''; })
      .then(function (text) {
        /* Cloudflare emits exactly "loc=GB" on its own line. The optional
           whitespace is slack for the day that stops being true. */
        var m = /^\s*loc=([A-Z]{2})\s*$/m.exec(text || '');
        if (!m) return;
        if (m[1] === 'XX' || m[1] === 'T1') return;
        try { sessionStorage.setItem(COUNTRY_KEY, m[1]); } catch (e) {}
        fillCountry(m[1]);
      })
      .catch(function () { /* not behind Cloudflare, offline, or blocked */ });
  }

  function initForm(form) {
    var status = form.querySelector('.form-status');
    var endpoint = form.getAttribute('action') || '';
    var configured = endpointConfigured(form);

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

      /* Lock the submit control for the duration of the request. Until now the
         button stayed fully live, so a second click sent a second copy of the
         same enquiry — which looks like two leads, costs two places in a
         monthly submission quota, and cannot be told apart from a genuine
         second enquiry by anyone reading the mailbox. Restore it in the error
         branch below: a failed send has to leave the visitor somewhere they can
         retry, not staring at a dead button. */
      var submit = form.querySelector('[type="submit"], .form-foot button');
      if (submit) {
        submit.disabled = true;
        submit.setAttribute('aria-busy', 'true');
      }

      /* No endpoint configured. Rather than bounce the visitor straight into
         a mail client they may not have — which looks like the form doing
         nothing at all — tell them what is about to happen and give them the
         address to copy as well. */
      if (!configured) {
        e.preventDefault();
        if (status) {
          status.classList.remove('is-error');
          status.innerHTML =
            'This form is not connected yet — opening your email app with the ' +
            'message pre-filled. If nothing happens, email <a href="mailto:' +
            FALLBACK_EMAIL + '">' + FALLBACK_EMAIL + '</a> directly.';
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

          var thanks = form.getAttribute('data-thank-you') || '/thank-you';
          if (status) status.textContent = 'Thank you — redirecting…';
          window.location.href = thanks;
        })
        .catch(function () {
          if (submit) {
            submit.disabled = false;
            submit.removeAttribute('aria-busy');
          }
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
    detectCountry();

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
