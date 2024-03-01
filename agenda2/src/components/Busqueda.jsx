
const Busqueda = (persons, filter) => {
    return persons.filter(
      person => person.name.toLowerCase().includes(filter.toLowerCase())
    );
  }

export default Busqueda;