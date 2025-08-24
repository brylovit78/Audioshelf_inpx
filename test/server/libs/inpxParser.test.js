const chai = require('chai')
const expect = chai.expect
const AdmZip = require('adm-zip')

const { parseInpxBuffer } = require('../../../server/libs/inpxParser')

describe('inpxParser', () => {
  it('parses entries from zip buffer', () => {
    const zip = new AdmZip()
    const content = 'id,title,authors,archive,lang,group\n1,Test,"Author One;Author Two",archive.zip,en,\n'
    zip.addFile('test.inp', Buffer.from(content, 'utf8'))
    const buf = zip.toBuffer()
    const res = parseInpxBuffer(buf)
    expect(res).to.deep.equal([
      {
        id: '1',
        title: 'Test',
        authors: ['Author One', 'Author Two'],
        archive: 'archive.zip',
        lang: 'en',
        group: ''
      }
    ])
  })
})
