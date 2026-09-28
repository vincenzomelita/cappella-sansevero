const { html, oneLine } = require('~lib/common-tags')
const path = require('path')

/**
 * A shortcode for tombstone display of object data on an entry page
 */
module.exports = function(eleventyConfig, { page }) {
  const { config, objects, objects_en } = eleventyConfig.globalData
  const { objectLinkText } = config.entryPage

  return function (pageObjects = []) {
    const titleCase = eleventyConfig.getFilter('titleCase')
    const icon = eleventyConfig.getFilter('icon')
    const markdownify = eleventyConfig.getFilter('markdownify')
    const properties = objects.object_display_order

const isEnglish =
  page &&
  (
    (page.data && page.data.lang === 'en') ||
    (page.url && page.url.startsWith('/en/'))
  )

const displayLabels =
  isEnglish &&
  objects_en &&
  objects_en.object_display_labels
    ? objects_en.object_display_labels
    : {}

    const tableRow = (object, property) => {
      if (!object || !property || !object[property]) return ''

      return html`
        <tr>
          <td>${displayLabels[property] || titleCase(property)}</td>
          <td>${markdownify(object[property].toString())}</td>
        </tr>
      `
    }

    const objectLink = (object) => object.link
      ? oneLine`
        <a class="button" href="${object.link}" target="_blank">
          ${objectLinkText} ${icon({ type: 'link', description: '' })}
        </a>`
      : ''

    const table = (object) => html`
      <section class="quire-entry__tombstone">
        <div class="container">
          <table class="table is-fullwidth">
            <tbody>
              ${properties.map((property) => tableRow(object, property)).join('')}
            </tbody>
          </table>
          ${objectLink(object)}
        </div>
      </section>
    `
    return pageObjects.map((object) => table(object)).join('')
  }
}
