const mongoose = require('mongoose')

if ( process.env.NODE_ENV !== 'production' ) {
  require('dotenv').config()
}

const url = process.env.MONGODB_URI

mongoose.connect(url)

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

const name = process.argv[2]
const number = process.argv[3]

if (name && number) {
  const person = new Person({
    name: name,
    number: number
  })
  
  person
    .save()
    .then( result => {
      console.log("lisätään henkilö", name, "numero", number, "luetteloon")
      mongoose.connection.close()
    })
}

if (!name && !number) {
  Person
  .find({})
  .then(result => {
    console.log("puhelinluettelo:")
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}

