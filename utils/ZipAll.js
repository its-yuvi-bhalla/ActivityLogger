const fs = require('fs')
const dayjs = require('dayjs')
const archiver = require('archiver')

async function zipAll() {
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

  await archive.finalize().then(() => {
    fs.rmSync(logsDir, { recursive: true, force: true })
    fs.rmSync(screenshotsDir, { recursive: true, force: true })
  })
}

module.exports = zipAll
