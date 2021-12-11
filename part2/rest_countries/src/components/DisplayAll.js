import { useState } from "react";
import Display from "./Display";
import Table from "./Table";

const DisplayAll = (props) => {
  const [getCountry, setCountry] = useState(0);
  const [toggle, setToggle] = useState(false);

  const handleClick = (event) => {
    console.log(event.target.value);
    setCountry(event.target.value);
    toggle ? setToggle(false) : setToggle(true);
    console.log("selected country", getCountry);
  };

  return (
    <>
      <table>
        {props.countries.map((country, index) => {
          return (
            <Table
              column1={country.name.common}
              column2={
                <button value={index} onClick={handleClick}>
                  {toggle ? "Hide" : "Show"}
                </button>
              }
            />
          );
        })}
      </table>
      {toggle ? <Display country={props.countries[getCountry]} /> : ""}
    </>
  );
};

export default DisplayAll;
