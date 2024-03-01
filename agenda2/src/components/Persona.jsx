import Busqueda from './Busqueda'
import personService from "../services/persons"

const Persona = ({ persons, filter, setPersons, setErrorMessage }) => {
    let filteredPersons;
    if (filter === "") {
      filteredPersons = persons;
    } else {
      filteredPersons = Busqueda(persons, filter);
    }
    
    const borrar = (person) => {
      const resultado = window.confirm(`Delete ${person.name}`)
      if(resultado){
        personService.eliminar(person.id)
          .then( response =>{
            setPersons(persons.filter(p => p.id !== person.id))
            setErrorMessage(`Delete ${response.data.name}`)
            setTimeout(() => {
              setErrorMessage('')
            }, 3000);
          })
          .catch((err) => {
            // Maneja el error que ocurre cuando intentas eliminar a una persona que ya ha sido eliminada
            if (err.response && err.response.status === 404) {
              setErrorMessage( `Error: has already been deleted`);
            } else {
              setErrorMessage( `Error: An unexpected error occurred`);
            }
            setErrorMessage('');
          });  
      } 
    }

    return (
      <>
        {filteredPersons.map(person => 
          (
            <div key={person.name}>
              <span>{person.name} {person.phone} </span>
              <button onClick={ () => borrar(person) }>delete</button>
            </div>
          )
        )}
      </>
    );
  }

export default Persona;