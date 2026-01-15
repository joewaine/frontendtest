import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {

  const [persons, setPersons] = useState(null)
  const [newName, setNewName] = useState('')
  const [personSearch, setPersonSearch] = useState([])
  const [newNumber, setNewNumber] = useState('')
  const [notification, setNotification] = useState('')
  const [notificationType, setNotificationType] = useState('')
 
  useEffect(() => {
    personService.getAll().then(response => {
        setPersons(response)
        setPersonSearch(response)
      });

    
  }, []);


  const personDelete = (id) => {


    personService.deleteItem(id).then(response => {
      const filteredPersons = persons.filter(person => person.id !== id);

      const deletedPerson = persons.filter(person => person.id === id)[0];

      setPersons(filteredPersons)
      setPersonSearch(filteredPersons)
      
      setNotification(`${deletedPerson.name} has been deleted`)
      setNotificationType(false)

      setTimeout(() => {
        setNotification('')
        setNotificationType(true)
        }, 5000)

      });


  }

  const handlePersonSearch = (event) => {
     setPersonSearch(persons.filter(person => person.name.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1));
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

    const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
     event.preventDefault()
     const personObject = {
        name: newName,
        number: Number(newNumber)
     }
  
     if(persons.filter(person => person.name === newName).length > 0){

      personService.update(persons.filter(person => person.name === newName)[0].id, personObject).then(response => {
        const updatedPersons = persons.map( person => person.name === newName ? {...person, number: newNumber } : person )
        setPersons(updatedPersons)
        setPersonSearch(updatedPersons)
        setNotification(`${newName} has been updated`)
        setNotificationType(true)
        setTimeout(() => {
        setNotification('')
        setNotificationType(true)
        }, 5000)
      }).catch(response => {

      setNotification(`${newName} has already been deleted from the server`)
      setNotificationType(false)

      setTimeout(() => {
        setNotification('')
        setNotificationType(true)
        }, 5000)

    })

    } else {



    personService.create(personObject).then(response => {
      console.log(response)
    setPersons(persons.concat(response))
    setPersonSearch(persons.concat(response))

        setNotification(`${newName} has been added`)
        setNotificationType(true)

        setTimeout(() => {
        setNotification('')
        setNotificationType(true)

        }, 5000)

      }).catch(response =>{
        console.log(response)
      })


      
    }

        setNewName('')
        setNewNumber('')
      
  }


  return (
    <div>
      <h2>Phonebook</h2>




<Filter personSearch={personSearch} handlePersonSearch={handlePersonSearch} />

      <Notification message={notification} notificationType={notificationType} />
       <br/>
<PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNumberChange={handleNumberChange} handlePersonChange={handlePersonChange}/>
 

      <h2>Numbers</h2>


<Persons personSearch={personSearch} personDelete={personDelete} />


    </div>
  )
}

export default App




// async function createUser() {
//   const response = await axios.post("http://localhost:3001/persons", { 
//       name: "Shitfather", 
//       number: "39-44-5323523",
//       id: 22
//     },);
// }
// createUser()
// console.log(persons)