import React, { useEffect, useState } from "react";
import PersonForms from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import bookService from "./services/bookService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState();
  const [filterName, setFilterName] = useState("");

  //Get first response from server
  useEffect(() => {
    bookService.getAll().then((responseData) => {
      setPersons(responseData);
    });
  }, []);

  console.log(persons);
  const addNewName = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const addNewNumber = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const searchName = (event) => {
    console.log(event.target.value);
    setFilterName(event.target.value);
  };

  const addToDirectory = (event) => {
    event.preventDefault();

    const checkContact = persons.reduce((prev, current) => {
      if (current["name"] === newName) {
        prev = { ...current, number: newNumber };
      }
      return prev;
    }, {});

    if (checkContact.hasOwnProperty("id")) {
      if (
        window.confirm(
          `${checkContact.name} is already added to phonebook, replace the old number with new one?`
        )
      ) {
        bookService
          .updateContact(checkContact.id, checkContact)
          .then((status) => {
            if (status === 200) {
              bookService.getAll().then((responseData) => {
                setPersons(responseData);
              });
            }
          });
      }

      setNewName("");
      setNewNumber("");

      return;
    }

    const newPerson = { name: newName, number: newNumber };
    //Add new Contact
    bookService
      .addContact(newPerson)
      .then((responseData) => setPersons(persons.concat(responseData)));

    setNewName("");
    setNewNumber("");
  };

  //To delete a contact
  const deleteContact = (event) => {
    event.preventDefault();
    console.log("id", event.target.value);

    if (window.confirm(`Delete ${event.target.name}?`)) {
      bookService.deleteContact(event.target.value).then((status) => {
        if (status === 200) {
          bookService.getAll().then((responseData) => {
            setPersons(responseData);
          });
        }
      });
    }
    console.log("After deletion", persons);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} searchName={searchName} />
      <h2>Add a new</h2>
      <PersonForms
        addToDirectory={addToDirectory}
        newName={newName}
        addNewName={addNewName}
        newNumber={newNumber}
        addNewNumber={addNewNumber}
      />
      <h2>Numbers</h2>
      {console.log(filterName)}
      <Persons
        persons={persons}
        filterName={filterName}
        deleteContact={deleteContact}
      />
    </div>
  );
};

export default App;
