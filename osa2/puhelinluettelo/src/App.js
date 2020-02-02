import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchCondition, setSearchCondition] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    } 

    if (persons.filter(person => (person.name === newName)).length > 0) {
      if (window.confirm(`Want to update number of ${newName}?`)) {
        const p = persons.find(p => p.name === newName)
        personService
          .update(p.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== p.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
          })
      }
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const removePerson = (id) => {    
    if (window.confirm(`Are you sure?`)) {
      personService
      .remove(id)
      .then(initialPersons => {
          setPersons(initialPersons)
      })
    }   
  }

  const updatePerson = (id) => {

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
          {<Persons personsToShow={personsToShow} removePerson={removePerson}/>}          
        </ul>
    </div>
  )
}

export default App