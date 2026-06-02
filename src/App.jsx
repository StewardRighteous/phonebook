import { useState } from "react";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";

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

  const handleSearchChange = (e) => setSearch(e.target.value);
  const handleNewNumberChange = (e) => setNewNumber(e.target.value);
  const handleNewNameChange = (e) => setNewName(e.target.value);

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
      <Filter search={search} handleSearchChange={handleSearchChange} />
      <h2>Add a New</h2>
      <PersonForm
        addNewName={addNewName}
        handleNewNameChange={handleNewNameChange}
        handleNewNumberChange={handleNewNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons names={namesToShow} />
    </div>
  );
};

export default App;
