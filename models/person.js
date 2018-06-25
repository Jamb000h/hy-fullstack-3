// Requires
const mongoose = require('mongoose')

// Environment variables
if ( process.env.NODE_ENV !== 'production' ) {
  require('dotenv').config()
}

// Mongo
const url = process.env.MONGODB_URI
mongoose.connect(url)

// Model
const Person = mongoose.model('Person', {
  name: String,
  number: String
})

module.exports = Person