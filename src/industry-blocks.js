'use strict';

/* Section builders shared by the product and industry page families.
 *
 * These started life inside src/pages/40-products.js. The industry pages need
 * exactly the same shapes — a spec table, a feature grid, a FAQ accordion, a
 * prose block — and copying them would mean two implementations of the same
 * markup drifting apart the first time either one is restyled. So they live
 * here and both families import them.
 *
 * The output is intentionally plain: <section>, <div class="container">,
 * <h2>, <p>. All the visual weight comes from the existing design system in
 * style.css / css/style-additions.css. Nothing here invents a component that
 * would need new CSS. */

/* Alternating background. A long page that is one flat colour reads as a wall;
   alternating full-bleed bands give the eye somewhere to rest and let a reader
   tell where one section ends. Callers pass `alt` explicitly rather than the
   helper guessing, because the correct alternation depends on the whole page
   and not on any single section. */
function band(alt) {
  return '<section class="section' + (alt ? ' section-alt' : '') + '">';
}

/** Heading + optional intro paragraph. */
function heading(head, intro) {
  return '<h2>' + head + '</h2>' +
    (intro ? '\n\n<p class="section-intro">' + intro + '</p>' : '');
}

/* ---------------------------------------------------------------- *
 * content blocks
 * ---------------------------------------------------------------- */

/**
 * Table of specification rows.
 * @param {Array<[string,string]>} rows
 * @param {string} [note] caveat rendered under the table
 * @param {boolean} alt band background, decided by the caller's alternation
 */
function specTable(rows, note, alt) {
  return `${band(alt)}

<div class="container">

<div class="table-wrap">
<table class="spec-table">
<tbody>
${rows.map((r) => `<tr><th>${r[0]}</th><td>${r[1]}</td></tr>`).join('\n')}
</tbody>
</table>
</div>

${note ? `<p class="table-note">${note}</p>` : ''}

</div>

</section>`;
}

/**
 * Prose section: optional paragraphs followed by an optional bullet list.
 * @param {{heading:string, paras?:string[], list?:string[], alt?:boolean}} s
 */
function proseSection(s) {
  return `${band(s.alt)}

<div class="container narrow prose">

<h2>${s.heading}</h2>

${(s.paras || []).map((p) => `<p>${p}</p>`).join('\n')}

${s.list ? `<ul class="check-list">${s.list.map((li) => `<li>${li}</li>`).join('\n')}</ul>` : ''}

</div>

</section>`;
}

/**
 * Grid of titled cards.
 * @param {{heading:string, intro?:string, items:Array<{title:string,text:string}>, alt?:boolean, level?:number}} s
 */
function featureGrid(s) {
  const tag = s.level === 3 ? 'h3' : 'h3';
  return `${band(s.alt)}

<div class="container">

${heading(s.heading, s.intro)}

<div class="features-grid">
${s.items
  .map(
    (it) => `<article class="feature-card">
<${tag}>${it.title}</${tag}>
<p>${it.text}</p>
</article>`
  )
  .join('\n')}
</div>

</div>

</section>`;
}

/**
 * Tabular comparison, so the reader can see differences side by side rather
 * than reconstruct them from prose. Column one is a row label.
 */
function comparisonTable(head, cols, rows, note, alt) {
  return `${band(alt)}

<div class="container">

<h2>${head}</h2>

<div class="table-wrap">
<table class="spec-table">
<thead>
<tr>${cols.map((c) => `<th>${c}</th>`).join('')}</tr>
</thead>
<tbody>
${rows
  .map(
    (r) => `<tr><th>${r[0]}</th>${r.slice(1).map((c) => `<td>${c}</td>`).join('')}</tr>`
  )
  .join('\n')}
</tbody>
</table>
</div>

${note ? `<p class="table-note">${note}</p>` : ''}

</div>

</section>`;
}

/**
 * Accordion of questions.
 *
 * Uses <details>/<summary>, which is keyboard-accessible and works with no
 * JavaScript at all. A div-and-button accordion would need script to be
 * reachable, and this site has to survive script being blocked.
 */
function faqBlock(items, head, alt) {
  return `${band(alt)}

<div class="container">

<h2>${head || 'Questions about this packaging'}</h2>

<div class="faq-list">
${items
  .map(
    (f) => `<details class="faq-item">
<summary>${f.q}</summary>
<div class="faq-answer"><p>${f.a}</p></div>
</details>`
  )
  .join('\n')}
</div>

</div>

</section>`;
}

/**
 * A short emphasised note, set apart from the surrounding prose so it reads as
 * a caveat rather than as another paragraph.
 */
function noteBlock(text, alt) {
  return `${band(alt)}

<div class="container narrow prose">

<p class="table-note">${text}</p>

</div>

</section>`;
}

module.exports = {
  band, heading,
  specTable, proseSection, featureGrid, comparisonTable, faqBlock, noteBlock
};
