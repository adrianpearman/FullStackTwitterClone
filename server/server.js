// Installed Node Modules
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const monk = require('monk')
const mongoose = require('mongoose')

// Using Monnk to connect to the database
const db = monk('localhost/twitterBark')
const barks = db.get('barks') // Grabs all of the saved barks

const PORT = 4000

app.use(cors())
// app.use(express.json()) - Alternative to using bodyParser middleware
app.use(bodyParser())

app.get('/', (req, res) => {
  res.json({
    connected: 'true'
  })
})

isValidBark = (data) => {
  return data.name && data.name.toString().trim() !== '' && data.content && data.content.toString().trim() !== '' 
}

app.post('/barks', (req, res) => {
  if (isValidBark(req.body)) {
    const bark = {
      name: req.body.name.toString(),
      content: req.body.content.toString(),
      created: new Date()
    }

    barks
      .insert(bark)
      .then((createdBark) => {
        res.json(createdBark)
      })

  }else{
    res.status(422)
    res.json({
      message: ""
    })
  }
})

app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`)
})