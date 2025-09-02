const { uIOhook } = require('uiohook-napi')
const printStatus = require('./utils/printStatus')
const timestamps = require('./utils/timestamps')
const saveLogAsPDF = require('./utils/saveLogAsPDF')
const zipAll = require('./utils/Zipall')

console.log('Manager Bot Running \n')

let keypress = 0
uIOhook.on('keydown', () => keypress++)
uIOhook.start()
const startedAt = Date.now()

// run every second
setInterval(() => timestamps(printStatus, startedAt, keypress), 1000)

// 🔒 cleanup on all exit signals
;['SIGINT', 'SIGTERM', 'SIGQUIT', 'beforeExit', 'exit'].forEach(sig => {
  process.on(sig, () => {
    saveLogAsPDF()
    zipAll()
    setTimeout(() => process.exit(0), 1500) // wait so zip finishes
  })
})
