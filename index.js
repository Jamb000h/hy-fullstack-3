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
    res.json(result)
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

  const person = persons.find(p => p.name === body.name)

  if(person) {
    return res.status(400).json({error: 'name must be unique'})
  }

  const newPerson = {
    name: body.name,
    number: body.number,
    id: Math.round(Math.random() * 10000000)
  }

  persons = persons.concat(newPerson)

  res.json(newPerson)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)

  if(person) {
    persons = persons.filter(p => p.id !== id)
    res.status(204).end()
  }

  res.status(404).end()
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
