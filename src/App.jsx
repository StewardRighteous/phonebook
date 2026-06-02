import { useState } from "react";

const App = () => {
  const [phoneBook, setPhoneBook] = useState([
    { name: "Arto Hellas", number: "040-1234567" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addNewName = (e) => {
    e.preventDefault();
    const existingNames = phoneBook.map((detail) => detail.name);
    existingNames.includes(newName)
      ? alert(`${newName} is already added to phonebook`)
      : setPhoneBook(phoneBook.concat({ name: newName, number: newNumber }));
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h1>Phone Book</h1>
      <form onSubmit={addNewName}>
        <p>
          name:
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </p>
        <p>
          Number:
          <input
            type="text"
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
        </p>
        <button>Add</button>
      </form>
      <h1>Numbers</h1>
      {phoneBook.map((detail) => (
        <p key={detail.name}>
          {detail.name} {detail.number}
        </p>
      ))}
    </div>
  );
};

export default App;
