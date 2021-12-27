import React, { useEffect, useState } from "react";
import "./index.css";
import PersonForms from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import bookService from "./services/bookService";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorClass, setErrorClass] = useState(false);

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

    if (newName === "" || newNumber === "") {
      setErrorMessage(`name/number field cannot be empty`);
      setErrorClass(false);

      setTimeout(() => {
        setErrorMessage(null);
        setErrorClass(false);
      }, 5000);

      return;
    }

    const checkContact = persons.reduce((prev, current) => {
      console.log("Checked");
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
            return checkContact.name;
          })
          .then((name) => {
            setErrorMessage(`${name}'s number modified successfully`);
            setErrorClass(true);
          });
      }

      setTimeout(() => {
        setErrorMessage(null);
        setErrorClass(false);
      }, 5000);

      setNewName("");
      setNewNumber("");

      return;
    }

    const newPerson = { name: newName, number: newNumber };
    //Add new Contact, promise chain
    bookService
      .addContact(newPerson)
      .then((responseData) => {
        setPersons(persons.concat(responseData));
        return newName;
      })
      .then((name) => {
        setErrorMessage(`${name} added successfully`);
        setErrorClass(true);
      })
      .catch((error) => {
        console.log(error.response.data);
        setErrorMessage(error.response.data.error);
        setErrorClass(false);
      });

    setTimeout(() => {
      setErrorMessage(null);
      setErrorClass(false);
    }, 5000);

    setNewName("");
    setNewNumber("");
  };

  //To delete a contact
  const deleteContact = (event) => {
    event.preventDefault();
    console.log("id", event.target.value);

    //Promise chain
    if (window.confirm(`Delete ${event.target.name}?`)) {
      bookService
        .deleteContact(event.target.value)
        .then((status) => {
          if (status === 200) {
            bookService
              .getAll()
              .then((responseData) => {
                setPersons(responseData);
                return event.target.name;
              })
              .then((name) => {
                setErrorMessage(`${event.target.name} deleted successfully`);
                setErrorClass(false);
              });
          }
        })
        .catch((error) => {
          setErrorMessage(
            `Information of ${event.target.name} has already been removed from the server`
          );
          setErrorClass(false);
        });
    }

    setTimeout(() => {
      setErrorMessage(null);
      setErrorClass(false);
    }, 5000);
    console.log("After deletion", persons);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} errorClass={errorClass} />
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
