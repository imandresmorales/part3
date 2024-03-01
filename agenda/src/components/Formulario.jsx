const Formulario = ({ newName, newPhone, handleNameChange, handlePhoneChange, addName }) => {
    return (
      <>
      <form onSubmit={addName}>
          <div>
            name: <input value={newName} onChange={handleNameChange} />
          </div>
          <div>
            number: <input value={newPhone} onChange={handlePhoneChange} />
          </div>
          <div >
            <button type="submit">add</button>
          </div>
        </form>
      </>
    )
  }

export default Formulario;