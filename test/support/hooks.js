const { setDefaultTimeout, BeforeAll, AfterAll, Before } = require('cucumber')
const { prettifyLog } = require('../support/utils')
setDefaultTimeout(30 * 1000)
BeforeAll(async function () {
})
Before(addInfoToScenario)
AfterAll(async () => {})

function addInfoToScenario (scenario) {
  const name = scenario.pickle.name
  this.tags = scenario.pickle.tags
  prettifyLog({ title: name, logBody: '', color: 'green' })
}
