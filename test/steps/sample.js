const { defineStep } = require('cucumber')
const test = require('assert')

defineStep('my interesting table', function (rawTable) {
  const table = rawTable.rowsHash() // formats table as a javascript object
  const formattedTable = {
    horizon: Number(table.horizon),
    sky: Number(table.sky)
  }
  // save the table data in the World instance for further use
  // in different steps
  this.table = formattedTable
})
defineStep('I increase {string} by {int}', function (variable, amount) {
  // Access the World Instance to get table data and save it
  this.table[variable] += Number(amount)
})

defineStep('the sum of both is {int}', function (expected) {
  const actual = this.table.sky + this.table.horizon

  // Make an assertion here
  test.deepStrictEqual(actual, expected)
})
