const { html } = require('~lib/common-tags')

/**
 * Renders previous page and next page buttons
 *
 * @param {Object} eleventyConfig
 * 
 * @param {Object} params
 * @param {Object} options
 *
 * @return {String} "previous" and "next" buttons
 */
module.exports = function(eleventyConfig) {
  const icon = eleventyConfig.getFilter('icon')
  const {
    nextButtonText,
    prevButtonText
  } = eleventyConfig.globalData.config.navigation

return function(params, options={}) {
  const { pagination } = params
  const { currentPage, nextPage, previousPage } = pagination

  const currentLang = currentPage && (
    currentPage.data.lang ||
    (currentPage.url.startsWith('/en/') ? 'en' : 'it')
  )

  const localizedPrevButtonText = currentLang === 'en'
    ? 'Previous'
    : prevButtonText

  const localizedNextButtonText = currentLang === 'en'
    ? 'Next'
    : nextButtonText

    const prevPageButton = () => {
      if (!previousPage) return
      return html`
        <li class="quire-nav-button prev">
          <a href="${previousPage.url}">${icon({ type: 'left-arrow', description: 'Go back a page'})}\u0020<span class="nav-title">${localizedPrevButtonText}</span></a>
          <span class="visually-hidden">Previous Page (left keyboard arrow or swipe)</span>
        </li>
      `
    }

    const nextPageButton = () => {
      if (!nextPage) return
      return html`
        <li class="quire-nav-button next">
          <a href="${nextPage.url}"><span class="nav-title">${localizedNextButtonText}</span>\u0020${icon({ type: 'right-arrow', description: 'Go back next page' })}</a>
            <span class="visually-hidden">Next Page (right keyboard arrow or swipe)</span>
        </li>
      `
    }

    return html`
      <div class="quire-contents-buttons" data-outputs-exclude="epub,pdf">
        <ul>
          ${prevPageButton()}
          ${nextPageButton()}
        </ul>
      </div>
    `
  }
} 
