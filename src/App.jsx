import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import axios from "axios";

const App = () => {
  const [phoneBook, setPhoneBook] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((resp) => {
      setPhoneBook(resp.data);
    });
  });

  const handleSearchChange = (e) => setSearch(e.target.value);
  const handleNewNumberChange = (e) => setNewNumber(e.target.value);
  const handleNewNameChange = (e) => setNewName(e.target.value);

  const addNewName = (e) => {
    e.preventDefault();
    const existingNames = phoneBook.map((detail) => detail.name);
    if (existingNames.includes(newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      axios
        .post("http://localhost:3001/persons", {
          name: newName,
          number: newNumber,
        })
        .then((resp) => setPhoneBook(phoneBook.concat(resp.data)));
      setNewName("");
      setNewNumber("");
    }
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
