// Requires
const mongoose = require('mongoose')

// Environment variables
if ( process.env.NODE_ENV !== 'production' ) {
  require('dotenv').config()
}

// Mongo
const url = process.env.MONGODB_URI
mongoose.connect(url)

// Schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  number: String
})

// Model statics
personSchema.statics.format = function(person) {
  return {
    id: person._id,
    name: person.name,
    number: person.number
  }
}

// Model
const Person = mongoose.model('Person', personSchema)

module.exports = Person