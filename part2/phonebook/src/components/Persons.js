import Note from "./Note";

const Persons = ({ persons, filterName }) => {
  return (
    <ul style={{ listStyleType: "none" }}>
      {persons.map((person) => {
        if (person["name"].toLowerCase().includes(filterName.toLowerCase())) {
          return (
            <Note
              key={person["id"]}
              name={person["name"]}
              number={person["number"]}
            />
          );
        }
        return "";
      })}
    </ul>
  );
};

export default Persons;
