const fs = require('fs')
const dayjs = require('dayjs')
const screenshot = require('screenshot-desktop')

async function timestamps(printStatus, startedAt, keypress) {
  printStatus(startedAt)
  const min = Number(dayjs().format('m'))
  const sec = Number(dayjs().format('s'))

  if (min % 10 === 0 && sec === 0) {
    const dir = `screenshots/${dayjs().format('DD_MMMM_YYYY')}`
    fs.mkdirSync(dir, { recursive: true })

    const time = dayjs().format('DD-MM-YY___HH_mm_ss')
    const filename = `${dir}/${time}.png`

    try {
      const img = await screenshot()
      fs.writeFileSync(filename, img)

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

module.exports = timestamps
