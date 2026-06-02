import { useState } from "react";

const App = () => {
  const [phoneBook, setPhoneBook] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleNewNameChange = (e) => setNewName(e.target.value);

  const addNewName = (e) => {
    e.preventDefault();
    setPhoneBook(phoneBook.concat({ name: newName }));
  };

  return (
    <div>
      <h1>Phone Book</h1>
      <form onSubmit={addNewName}>
        <p>
          name:
          <input type="text" value={newName} onChange={handleNewNameChange} />
        </p>
        <button>Add</button>
      </form>
      <h1>Numbers</h1>
      {phoneBook.map((detail) => (
        <p key={detail.name}>{detail.name}</p>
      ))}
    </div>
  );
};

export default App;
