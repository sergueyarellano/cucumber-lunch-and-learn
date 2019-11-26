const chalk = require('chalk')

module.exports = {
  prettifyLog,
  double
}

function prettifyLog ({ title, logBody, color }) {
  console.log(chalk.hex(color).bold(`\n${title}\n`), logBody)
}

function double (num) {
  return Number(num) * 2
}
