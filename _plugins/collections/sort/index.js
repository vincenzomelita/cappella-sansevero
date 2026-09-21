const chalkFactory = require('~lib/chalk')

const logger = chalkFactory('plugins:collections')

/**
 * Sort method applied to pages in collections
 * @param {Object} a and b are page objects
 */
module.exports = (a, b) => {
  const aLang = a.data.lang || (a.url && a.url.startsWith('/en/') ? 'en' : 'it')
  const bLang = b.data.lang || (b.url && b.url.startsWith('/en/') ? 'en' : 'it')
  if (a.data.order === b.data.order && aLang === bLang) {
    logger.warn(`"${a.inputPath}" and "${b.inputPath}" have identical values for the front-matter property "order" and may not sort as expected.`)
  }
  return a.data.order - b.data.order
}
