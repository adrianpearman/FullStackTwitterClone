// Installed Node Modules
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const monk = require('monk')
const mongoose = require('mongoose')
const Filter = require('bad-words')
const rateLimit = require('express-rate-limit')

// Using Monk to connect to the database
const db = monk(process.env.MONGO_URI || 'localhost/twitterBark')
const barks = db.get('barks') // Grabs all of the saved barks

// App Variables
const PORT = process.env.PORT || 4000
const filter = new Filter()


// Middlewares
app.use(cors())
// app.use(express.json()) - Alternative to using bodyParser middleware
app.use(bodyParser())

isValidBark = (data) => {
  return data.name && data.name.toString().trim() !== '' && data.content && data.content.toString().trim() !== '' 
}

// Routes
app.get('/', (req, res) => {
  res.json({
    connected: 'true'
  })
})

app.get('/barks', (erq, res) => {
  barks.find()
    .then((barks) => {
      res.json(barks)
    })
})

app.use(
  rateLimit({
    windowMS: 30 * 1000, // 30 seconds
    max: 100, // Limits each IP to 1 requests per windowMs
  })
)

app.post('/barks', (req, res) => {
  if (isValidBark(req.body)) {
    const bark = {
      name: filter.clean(req.body.name.toString()),
      content: filter.clean(req.body.content.toString()),
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

