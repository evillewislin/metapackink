'use strict';

/* The article collections.
 *
 * Two list pages — /blog/ and /case-studies/ — plus one page per published
 * article, all assembled from the catalogues in src/articles/. The lists are
 * generated from the same array the article pages come from, which is the point:
 * a card cannot point at an article that does not exist, because both the card
 * and the article are produced by iterating the same list.
 *
 * Entries marked `planned: true` in the catalogue are skipped entirely, so the
 * catalogue can hold titles and dates for work that is scheduled but unwritten
 * without any of it reaching the built site. */

const { allArticlePages } = require('../articles');

module.exports = allArticlePages();
