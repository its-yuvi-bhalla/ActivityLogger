const readline = require('readline')
const formatElapsed = require('./formatElapsed')

function printStatus(startedAt) {
  const elapsed = Date.now() - startedAt
  readline.clearLine(process.stdout, 0)
  readline.cursorTo(process.stdout, 0)
  process.stdout.write(`Time Elapsed: ${formatElapsed(elapsed)}`)
}

module.exports = printStatus
