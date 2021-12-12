const PersonForms = ({
  addToDirectory,
  newName,
  addNewName,
  newNumber,
  addNewNumber,
}) => {
  return (
    <form onSubmit={addToDirectory}>
      <table>
        <tr>
          <td>name:</td>{" "}
          <td>
            <input value={newName} onChange={addNewName} />
          </td>
        </tr>
        <tr>
          <td>number:</td>{" "}
          <td>
            <input value={newNumber} onChange={addNewNumber} />
          </td>
        </tr>
        <tr>
          <td>
            <button type="submit">add</button>
          </td>
        </tr>
      </table>
    </form>
  );
};

export default PersonForms;
