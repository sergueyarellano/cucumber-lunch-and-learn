const test = require('tape')

test('should pass', ({ equal, end }) => {
  const actual = true
  const expected = true
  equal(actual, expected)
  end()
})
