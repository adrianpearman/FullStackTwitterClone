const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')

const PORT = 4000

app.get('/', (req, res) => {
  
})

app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`)
})