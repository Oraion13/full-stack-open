const PersonForms = ({
  addToDirectory,
  newName,
  addNewName,
  newNumber,
  addNewNumber,
}) => {
  return (
    <form onSubmit={addToDirectory}>
      <div>
        name: <input value={newName} onChange={addNewName} />
      </div>
      <div>
        number: <input value={newNumber} onChange={addNewNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForms;
