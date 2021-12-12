import Note from "./Note";

const Persons = ({ persons, filterName, deleteContact }) => {
  return (
    <table>
      {persons.map((person) => {
        if (person["name"].toLowerCase().includes(filterName.toLowerCase())) {
          return (
            <Note
              id={person["id"]}
              name={person["name"]}
              number={person["number"]}
              deleteContact={deleteContact}
            />
          );
        }
        return "";
      })}
    </table>
  );
};

export default Persons;
