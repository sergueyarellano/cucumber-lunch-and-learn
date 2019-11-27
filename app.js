const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const level = require('level')
const db = level('my-db')
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(morgan('common'))

app.use(function (req, res, next) {
  db.put('name', 'world', function (err) {
    if (err) return console.log('Ooops!', err) // some kind of I/O error
    next()
  })
})
app.all('/', (req, res, next) => {
  // Fetch by key
  db.get('name', function (err, value) {
    if (err) return console.log('Ooops!', err) // likely the key was not found

    res.send(`Hello ${value}!`)
  })
})

app.listen(port, () => console.log(`Magic happens on port ${port}!`))
