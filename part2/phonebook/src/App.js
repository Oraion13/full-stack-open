import React, { useState } from "react";
import PersonForms from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState();
  const [filterName, setFilterName] = useState("");

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

    const checkPresent = persons.reduce((prev, current) => {
      if (current["name"] === newName) prev = current["name"];
      return prev;
    }, "");
    if (checkPresent !== "") {
      alert(`${checkPresent} is already added to phonebook`);
      return;
    }

    const newPerson = { name: newName, number: newNumber };
    setPersons(persons.concat(newPerson));
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} searchName={searchName} />
      <h2>Phonebook</h2>
      <PersonForms
        addToDirectory={addToDirectory}
        newName={newName}
        addNewName={addNewName}
        newNumber={newNumber}
        addNewNumber={addNewNumber}
      />
      <h2>Numbers</h2>
      {console.log(filterName)}
      <Persons persons={persons} filterName={filterName} />
    </div>
  );
};

export default App;