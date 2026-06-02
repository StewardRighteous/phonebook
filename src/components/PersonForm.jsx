const PersonForm = ({
  addNewName,
  newName,
  handleNewNameChange,
  newNumber,
  handleNewNumberChange,
}) => (
  <form onSubmit={addNewName}>
    <p>
      name:
      <input type="text" value={newName} onChange={handleNewNameChange} />
    </p>
    <p>
      Number:
      <input type="text" value={newNumber} onChange={handleNewNumberChange} />
    </p>
    <button>Add</button>
  </form>
);

export default PersonForm;
