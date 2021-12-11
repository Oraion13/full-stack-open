import Note from "./Note";
import Image from "./Image";
import Weather from "./Weather";

const Display = ({ country }) => {
  return (
    <>
      <h2>{country.name.common}</h2>

      <table>
        <tr>
          <td>Capital</td>
          <td>{country.capital[0]}</td>
        </tr>
        <tr>
          <td>Population</td>
          <td>{country.population}</td>
        </tr>
      </table>

      <h3>Languages</h3>
      <ul>
        {Object.entries(country.languages).map((language) => (
          <Note data={language[1]} />
        ))}
      </ul>

      <Image src={country.flags.png} alt={country.name.common} />

      <Weather capital={country.capital[0]} />
    </>
  );
};

export default Display;
