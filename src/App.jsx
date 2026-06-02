import { useState } from "react";

const App = () => {
  const [phoneBook, setPhoneBook] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  const addNewName = (e) => {
    e.preventDefault();
    const existingNames = phoneBook.map((detail) => detail.name);
    existingNames.includes(newName)
      ? alert(`${newName} is already added to phonebook`)
      : setPhoneBook(phoneBook.concat({ name: newName, number: newNumber }));
    setNewName("");
    setNewNumber("");
  };

  const namesToShow =
    search.trim() === ""
      ? phoneBook
      : phoneBook.filter((detail) =>
          detail.name.toLowerCase().includes(search.toLowerCase()),
        );

  return (
    <div>
      <h1>Phone Book</h1>
      <p>
        filter shown with{" "}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </p>
      <h2>Add a New</h2>
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
      <h2>Numbers</h2>
      {namesToShow.map((detail) => (
        <p key={detail.name}>
          {detail.name} {detail.number}
        </p>
      ))}
    </div>
  );
};

export default App;
