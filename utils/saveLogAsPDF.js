const fs = require('fs')
const dayjs = require('dayjs')
const PDFDocument = require('pdfkit')

async function saveLogAsPDF() {
  const logDir = `logs/${dayjs().format('DD_MMMM_YYYY')}`
  const keysLog = `${logDir}/keys.log`
  const pdfPath = `${logDir}/keys.pdf`

  if (fs.existsSync(keysLog)) {
    try {
      const logContent = fs.readFileSync(keysLog, 'utf8')

      const doc = new PDFDocument()
      doc.pipe(fs.createWriteStream(pdfPath))

      doc.fontSize(18).text('Keypress Log Report', { align: 'center' })
      doc.moveDown()
      doc.fontSize(12).text(logContent)

      doc.end()
      fs.unlinkSync(keysLog)  
    } catch (err) {
      console.error('Failed to create PDF log:', err)
    }
  }
}

module.exports = saveLogAsPDF
