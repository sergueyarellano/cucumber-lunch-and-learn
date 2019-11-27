const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(morgan('common'))
app.all('/', (req, res, next) => res.send('Hello World!'))

app.listen(port, () => console.log(`Magic happens on port ${port}!`))
