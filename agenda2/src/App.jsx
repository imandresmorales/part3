import { useState, useEffect } from "react";
import personService from "./services/persons"

import Formulario from "./components/Formulario";
import Persona from "./components/Persona";
import Busqueda from "./components/Busqueda";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const Notification = ({message}) => {
    if(message === ''){
      return null
    }
      const css =  {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
      }
      return(
        <div style={css}>
          {message}
        </div>
      )
  }
  const ErrorMessage = ({message}) => {
    if(message === ''){
      return null
    }
      const css =  {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
      }
      return(
        <div style={css}>
          {message}
        </div>
      )
  }

    useEffect(() => {
      personService.getAll()
          .then((response) => {
            setPersons(response.data);
          });
    }, []);

  const exist = () => (
    persons.some(person => person.name === newName)
  )
  
  const addName = (event) => {
    event.preventDefault();
    personService.getAll()
          .then((response) => {
            setPersons(response.data);
          });
    if(exist()){
      
        const result = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
        if(result){
          
          const person = Busqueda(persons, newName)
          const personChange = {name: person[0].name, phone: newPhone}
          
          if(person === undefined){       
            personService.get(person.id)
            .then(response => {
              if(response.data){
                
                personService.update(person.id, personChange)
                .then(response => {
                  setPersons(persons.map(p => p.id !== person.id ? p :  response.data))
                  setNotification(`Update phone of ${response.data.name}`)
                  setTimeout(() => {
                    setNotification('')
                  }, 3000);
                })
                .catch (error => {
                  console.error("error dentro del update"+error)   
                  
                  setPersons(persons.map(p => p.id !== person.id ? p :  response.data))
                  setNotification(`Update phone of ${response.data.name}`)
                  setTimeout(() => {
                    setNotification('')
                  }, 3000);
                })
              }
              else {
                console.error("the person does not exist")

                setPersons(persons.map(p => p.id !== person.id ? p :  response.data))
                  setNotification(`Update phone of ${response.data.name}`)
                  setTimeout(() => {
                    setNotification('')
                  }, 3000);
              }
            })
            .catch(error => {
              console.log("error "+error)             
            })
               
          }else {
            setErrorMessage(`Informaction of ${newName} has already been removed from server`)
            setTimeout(() => {
              setErrorMessage('')
            }, 3000); 
          }
                  
        }
      }else {
            const personObj = {
              name: newName,
              phone: newPhone,
            };
            personService
              .create(personObj)
              .then(response => {
                setPersons(persons.concat(response.data))
                setNewName('')
                setNewPhone('')
                setNotification(`Added ${response.data.name}`)
                setTimeout(() => {
                  setNotification('')
                }, 5000);
              })
              .catch (error => {
                console.log(error)
                console.log("error en create")
              })
          }
        
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <ErrorMessage message={errorMessage} />
      <div>
        filter shown with :{" "}
        <input value={filter} onChange={handleFilterChange} />
      </div>
      <h2>add a new</h2>
      <Formulario
        newName={newName}
        newPhone={newPhone}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
        addName={addName}
      />
      <h2>Numbers</h2>
      <Persona persons={persons} filter={filter} setPersons={setPersons} setErrorMessage={setErrorMessage} />
    </div>
  );
};

export default App;
