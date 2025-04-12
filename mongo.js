const mongoose = require('mongoose')

if (process.argv.length < 3 || process.argv.length === 4 || process.argv.length > 5) {
  console.log('give password as argument OR password, name and number as arguments.')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://fullstack:${password}@cluster0.qlb2xez.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  console.log('Phonebook:')

  Person.find({}).then(result => {
		if (result.length === 0) {
			console.log('Phonebook is empty')
			mongoose.connection.close()
		}

    result.forEach(person => {
      console.log(person.name, person.number)
			mongoose.connection.close()
    }) 	
  })
}

if (name && number) {
  const person = new Person({
    name: name,
    number: number
 	 })

  person.save().then(result => {
    console.log(`Added ${name} number ${number} to Phonebook`)
    mongoose.connection.close()
  })
}
