import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personService from './services/persons'
import Notification from './components/Notification'
import Error from './components/Error'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchCondition, setSearchCondition] = useState('')
  const [infoMessage, setInfoMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
            setInfoMessage(
            `Person ${newName} updated succesfully.`
            )
            setTimeout(() => {
            setInfoMessage(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(
              `Person ${newName} was already deleted from server.`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
    } else if (!newName|| !newNumber) {
      setErrorMessage('Person must have name and number!')
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        setInfoMessage(
          `Person ${newName} added succesfully.`
        )
        setTimeout(() => {
          setInfoMessage(null)
        }, 5000)
    }
  }

  const removePerson = (id) => {    
    if (window.confirm(`Are you sure?`)) {
      personService
      .remove(id)
      .then(initialPersons => {
          setPersons(persons.filter(p => p.id !== id))
      })
      setInfoMessage(
        `Person removed succesfully.`
        )
        setTimeout(() => {
        setInfoMessage(null)
        }, 5000)
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
      <Notification message={infoMessage} />
      <Error message={errorMessage} />
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