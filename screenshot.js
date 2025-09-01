const fs = require('fs')
const dayjs = require('dayjs')
const screenshot = require('screenshot-desktop')
const { uIOhook } = require('uiohook-napi')
const readline = require('readline')
const PDFDocument = require('pdfkit')
const archiver = require('archiver')

console.log('Manager Bot Running \n')

let keypress = 0

uIOhook.on('keydown', () => {
  keypress++
})
uIOhook.start()
const startedAt = Date.now()

function formatElapsed(ms) {
  const sec = Math.floor(ms / 1000)
  const h = String(Math.floor(sec / 3600)).padStart(2, '0')
  const m = String(Math.floor((sec % 3600) / 60)).padStart(2, '0')
  const s = String(sec % 60).padStart(2, '0')
  return `${h}:${m}:${s}`
}

function printStatus() {
  const elapsed = Date.now() - startedAt
  readline.clearLine(process.stdout, 0)
  readline.cursorTo(process.stdout, 0)
  process.stdout.write(`Time Elapsed: ${formatElapsed(elapsed)}`)
}

async function timestamps() {
  printStatus()
  const sec = Number(dayjs().format('s'))

  if (min%10 === 0 && sec === 0) {
    const dir = `screenshots/${dayjs().format('DD_MMMM_YYYY')}`
    fs.mkdirSync(dir, { recursive: true })

    const time = dayjs().format('DD-MM-YY___HH_mm_ss')
    const filename = `${dir}/${time}.png`

    try {
      const img = await screenshot()
      fs.writeFileSync(filename, img)

      // log keyboard stats 
      const keysDir = `logs/${dayjs().format('DD_MMMM_YYYY')}`
      fs.mkdirSync(keysDir, { recursive: true })
      const keysLog = `${keysDir}/keys.log`
      const key = `Keyboard activity on ${time} : ${keypress}`
      fs.appendFileSync(keysLog, key + '\n')

    } catch (err) {
      console.error(err)
    }
  }
}

setInterval(timestamps, 1000)

// 🔒 Convert log to PDF before shutdown
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

function zipAll() {
  const dateFolder = dayjs().format('DD_MMMM_YYYY')
  const zipPath = `archive_${dateFolder}.zip`
  const output = fs.createWriteStream(zipPath)
  const archive = archiver('zip', { zlib: { level: 9 } })

  output.on('close', () => {
    console.log(`\n Archive created: ${zipPath} (${archive.pointer()} bytes)`)
  })

  archive.on('error', err => { throw err })
  archive.pipe(output)

  const logsDir = `logs/${dateFolder}`
  const screenshotsDir = `screenshots/${dateFolder}`

  if (fs.existsSync(logsDir)) {
    archive.directory(logsDir, `logs_${dateFolder}`)
  }
  if (fs.existsSync(screenshotsDir)) {
    archive.directory(screenshotsDir, `screenshots_${dateFolder}`)
  }

  archive.finalize().then(()=>{
     fs.rmSync(logsDir, { recursive: true, force: true })
    fs.rmSync(screenshotsDir, { recursive: true, force: true })
  })
}

process.on('SIGINT', () => {
  saveLogAsPDF()
  setTimeout(() => {
    zipAll()
    setTimeout(() => process.exit(0), 1500) // wait so zip finishes
  }, 500)
})

process.on('beforeExit', () => {
  saveLogAsPDF()
  zipAll()
})
