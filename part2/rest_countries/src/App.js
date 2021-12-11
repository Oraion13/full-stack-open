import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "./components/Form";
import Filter from "./components/Filter";

const App = () => {
  const [filterCountry, setFilterCountry] = useState("");
  const [filtered, setFiltered] = useState([]);

  const changeFilterCountry = (event) => {
    setFilterCountry(event.target.value);
  };

  useEffect(() => {
    if (filterCountry.length === 0) return;
    axios
      .get(`https://restcountries.com/v3.1/name/${filterCountry}`)
      .then((response) => {
        setFiltered(response.data);
      });
  }, [filterCountry]);

  console.log("Searched country", filterCountry);
  console.log("Filtered", filtered);

  return (
    <div>
      <Form
        filterCountry={filterCountry}
        changeFilterCountry={changeFilterCountry}
      />
      <Filter filtered={filtered} />
    </div>
  );
};

export default App;
