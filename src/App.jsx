import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import personsService from "./services/persons";

const App = () => {
  const [phoneBook, setPhoneBook] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    personsService.getAll().then((initialPersons) => {
      setPhoneBook(initialPersons);
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
      personsService
        .createNew({
          name: newName,
          number: newNumber,
        })
        .then((returnedPerson) =>
          setPhoneBook(phoneBook.concat(returnedPerson)),
        );
      setNewName("");
      setNewNumber("");
    }
  };

  const deletePerson = (detail) => {
    const confirmation = confirm(` Delete ${detail.name} `)
    if(confirmation){
      personsService.deletePerson(detail.id);
    }
  }

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
      <Persons names={namesToShow} handleDeletePerson={deletePerson} />
    </div>
  );
};

export default App;
