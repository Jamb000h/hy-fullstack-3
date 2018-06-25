const express = require('express')

const app = express()

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
      number: 040-123456,
      id: 4
    }
  ]
}

app.get('/api/persons', (req, res) => {
  res.json(json)
})

app.get('/info', (req, res) => {
  const date = Date.now()
  const henkiloita = json.persons.length
  let text = 'puhelinluettelossa on '
  text += henkiloita
  text += ' henkilon tiedot'
  text += '\n\n'
  text += date

  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end(text)
})

const PORT = 3001

app.listen(PORT)
