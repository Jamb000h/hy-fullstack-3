const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

const json = {
  persons: [
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
}

app.get('/api/persons', (req, res) => {
  res.json(json)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = json.persons.find(p => p.id === id)

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

  const person = json.persons.find(p => p.name === body.name)

  if(person) {
    return res.status(400).json({error: 'name must be unique'})
  }

  const newPerson = {
    name: body.name,
    number: body.number,
    id: Math.round(Math.random() * 10000000)
  }

  json.persons = json.persons.concat(newPerson)

  res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = json.persons.find(p => p.id === id)

  if(person) {
    json.persons = json.persons.filter(p => p.id !== id)
    res.status(204).end()
  }

  res.status(404).end()
})

app.get('/info', (req, res) => {
  const date = new Date()
  const henkiloita = json.persons.length
  let text = 'puhelinluettelossa on '
  text += henkiloita
  text += ' henkilon tiedot'
  text += '\n\n'
  text += date

  res.set('Content-Type', 'text/plain')
  res.status(200)
  res.end(text)
})

const PORT = 3001

app.listen(PORT)
