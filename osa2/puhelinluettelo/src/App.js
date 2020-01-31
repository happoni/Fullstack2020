import React, { useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'

const App = (props) => {
  const [persons, setPersons] = useState(props.persons) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchCondition, setSearchCondition] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    } 

    if (persons.filter(person => (person.name === newName)).length > 0) {
      window.alert(`${newName} is already in phonebook`)
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const personsToShow = persons.filter(person =>
     (person.name.includes(searchCondition)))  

  const handleSearchChange = (event) => {
    setSearchCondition(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        {<Filter searchCondition={searchCondition} handleSearchChange={handleSearchChange} />}
      </div>
      <br></br>
      <div>
        <h2>Add a new person</h2>
      <form onSubmit={addPerson}>
        <div>
          name: 
          <input
            value={newName}
            onChange={handleNameChange}
          />
          <br></br>
          number: 
          <input
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      </div>
      <h2>Numbers</h2>
        <ul>
          {<Persons personsToShow={personsToShow} />}          
        </ul>
    </div>
  )
}

export default App