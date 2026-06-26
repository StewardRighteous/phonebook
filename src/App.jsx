import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import personsService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [phoneBook, setPhoneBook] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [notification, setNotification] = useState({
    message: null,
    isError: false,
  });

  useEffect(() => {
    personsService.getAll().then((initialPersons) => {
      setPhoneBook(initialPersons);
    });
  }, []);

  const handleSearchChange = (e) => setSearch(e.target.value);
  const handleNewNumberChange = (e) => setNewNumber(e.target.value);
  const handleNewNameChange = (e) => setNewName(e.target.value);

  const notify = (notificationMessage, isAError = false) => {
    setNotification({
      message: notificationMessage,
      isError: isAError,
    });
    setTimeout(() => setNotification({ message: null, isError: false }), 2000);
  };

  const updateNumber = (existingName) => {
    const confirmation = confirm(
      `${existingName} already exists! Do you want to change the number ?`,
    );
    if (!confirmation) {
      setNewName("");
      setNewNumber("");
    } else {
      const oldNumber = phoneBook.find((n) => n.name === existingName);
      const updateNumber = { ...oldNumber, number: newNumber };
      personsService
        .updateNumber(updateNumber.id, updateNumber)
        .then((returnedPerson) => {
          setPhoneBook(
            phoneBook.map((n) =>
              n.id === returnedPerson.id ? returnedPerson : n,
            ),
          );
          notify(`${returnedPerson.name}'s Number Updated Successfully`);
        })
        .catch((err) => {
          setPhoneBook(phoneBook.filter((n) => n.name !== existingName));
          notify(
            err.response.data.error || `${existingName} is Already Deleted`,
            true,
          );
        });
      setNewName("");
      setNewNumber("");
    }
  };

  const addNewName = (e) => {
    e.preventDefault();
    const existingNames = phoneBook.map((detail) => detail.name);
    if (existingNames.includes(newName)) {
      updateNumber(newName);
    } else {
      personsService
        .createNew({
          name: newName,
          number: newNumber,
        })
        .then((returnedPerson) => {
          setPhoneBook(phoneBook.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
          notify("New User is Created Successfully");
        })
        .catch((error) => {
          notify(error.response.data.error, true);
        });
    }
  };

  const deletePerson = (detail) => {
    const confirmation = confirm(` Delete ${detail.name} `);
    if (confirmation) {
      personsService.deletePerson(detail.id);
      setPhoneBook([...phoneBook].filter((p) => p.name !== detail.name));
      notify(`${detail.name} is Deleted Successfully`);
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
      <Notification
        message={notification.message}
        error={notification.isError}
      />
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
