const report = require('multiple-cucumber-html-reporter')
const jsonresults = require('./cucumber_report.json')
const path = require('path')
const outputFileName = createReportName(jsonresults)
const fs = require('fs')

report.generate({
  jsonDir: __dirname,
  reportPath: __dirname,
  metadata: {
    browser: {
      name: 'chrome',
      version: '60'
    },
    device: 'AWS codebuild 3GB instance, nodejs 10',
    platform: {
      name: 'ubuntu',
      version: '16.04'
    }
  },
  openReportInBrowser: true,
  pageTitle: 'Cucumber Report',
  reportName: 'lunch and learn',
  customData: {
    title: 'Run info',
    data: [
      { label: 'Project', value: 'SXM Constellation' },
      { label: 'Date Time', value: new Date() }
    ]
  }
})

fs.renameSync(path.resolve(__dirname, 'index.html'), path.resolve(__dirname, outputFileName))

function getTotalFailures (features) {
  // In a feature could be multiple scenarios
  return features.reduce((acc, feature) => acc + feature.elements.reduce(countFailedScenarios, 0), 0)
}

function countFailedScenarios (acc, scenario) {
  return isFailedStep(scenario.steps) ? ++acc : acc
}

function isFailedStep (steps) {
  // In a scenario only one step can fail
  return steps.some((step) => step.result.status === 'failed')
}

function createReportName (report) {
  // create a name like this: 20190215-16h36mUTC-1-failed.html
  const totalFailures = getTotalFailures(report)
  const status = totalFailures === 0 ? 'all-passed' : `${totalFailures}-failed`
  const timeNow = new Date()
  const hoursMinutes = `${timeNow.getUTCHours()}h${timeNow.getUTCMinutes()}mUTC`
  const date = timeNow.toISOString().split(/T/)[0].split('-').join('')
  return `${date}-${hoursMinutes}-${status}.html`
}
