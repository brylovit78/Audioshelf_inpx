const AdmZip = require('adm-zip')
const { parse } = require('csv-parse/sync')

/**
 * Parse INPX file buffer and return records
 * @param {Buffer} buffer
 * @returns {{id:string,title:string,authors:string[],archive:string,lang:string,group:string}[]}
 */
function parseInpxBuffer(buffer) {
  const zip = new AdmZip(buffer)
  const entries = zip.getEntries()
  const books = []
  for (const entry of entries) {
    if (entry.isDirectory) continue
    const content = entry.getData().toString('utf8')
    if (!content) continue
    const records = parse(content, { columns: true, skip_empty_lines: true })
    for (const rec of records) {
      const authors = rec.authors
        ? rec.authors.split(';').map((a) => a.trim()).filter(Boolean)
        : []
      books.push({
        id: rec.id,
        title: rec.title,
        authors,
        archive: rec.archive,
        lang: rec.lang,
        group: rec.group
      })
    }
  }
  return books
}

module.exports = { parseInpxBuffer }
