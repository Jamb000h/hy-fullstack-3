// Requires
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')

// Environment variables
if ( process.env.NODE_ENV !== 'production' ) {
  require('dotenv').config()
}

// Express & Middlewares
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))

// Logging
morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :body :status :res[content-length] - :response-time ms'))

let persons = 
  [
    {
      name: "Arto Hellas",
      number: "040-123456",
      id: 1
    },
    {
      name: "Martti Tienari",
      number: "040-123456",
      id: 2
    },
    {
      name: "Arto Järvinen",
      number: "040-123456",
      id: 3
    },
    {
      name: "Lea Kutvonen",
      number: "040-123456",
      id: 4
    }
  ]

app.get('/api/persons', (req, res) => {
  Person
  .find({})
  .then(result => {
    res.json(result.map(Person.format))
  })
  .catch( error => {
    console.log(error)
    return res.status(500).json({error: error})
  })
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)

  if(person) {
    return res.json(person)
  }

  res.status(404).end()
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if(body.name === undefined) {
    return res.status(400).json({error: 'name is required'})
  }

  if(body.number === undefined) {
    return res.status(400).json({error: 'number is required'})
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person
    .save()
    .then( result => {
      res.json(Person.format(result))
    })
    .catch( error => {
      console.log(error)
      return res.status(500).json({error: error})
    })
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  
  Person
    .deleteOne({_id: id})
    .then( result => {
      res.status(204).end()
    })
    .catch( error => {
      console.log(error)
      return res.status(500).json({error: error})
    })
})

app.get('/info', (req, res) => {
  const date = new Date()
  const henkiloita = persons.length
  let text = 'puhelinluettelossa on '
  text += henkiloita
  text += ' henkilon tiedot'
  text += '\n\n'
  text += date

  res.set('Content-Type', 'text/plain')
  res.status(200)
  res.end(text)
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
