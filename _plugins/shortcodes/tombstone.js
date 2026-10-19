const { html, oneLine } = require('~lib/common-tags')
const path = require('path')

/**
 * A shortcode for tombstone display of object data on an entry page
 */
module.exports = function(eleventyConfig, { page }) {
  const { config, objects } = eleventyConfig.globalData
  const { objectLinkText } = config.entryPage

  return function (pageObjects = []) {
    const titleCase = eleventyConfig.getFilter('titleCase')
    const icon = eleventyConfig.getFilter('icon')
    const markdownify = eleventyConfig.getFilter('markdownify')
    const properties = objects.object_display_order
    const englishLabels = {
      'Artista': 'Artist',
      'Titolo dell’opera': 'Title of the work',
      'Tecnica': 'Technique',
      'Materia': 'Material',
      'Datazione': 'Date',
      'Dimensioni': 'Dimensions',
      'Collocazione': 'Location'
    }

    const tableRow = (object, property) => {
      if (!object || !property || !object[property]) return ''

      const isEnglishObject = String(object.id || '').startsWith('en-')

      const label = isEnglishObject
        ? englishLabels[property] || titleCase(property)
        : titleCase(property)

      return html`
        <tr>
          <td>${label}</td>
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
