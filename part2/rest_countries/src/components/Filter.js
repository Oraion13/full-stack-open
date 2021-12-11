import Display from "./Display";
import DisplayAll from "./DisplayAll";

const Filter = (props) => {
  return props.filtered.length < 1 ? (
    "Type a country name"
  ) : props.filtered.length > 10 ? (
    "Too many matches, specify another filter"
  ) : props.filtered.length > 1 ? (
    <DisplayAll countries={props.filtered} />
  ) : (
    <Display country={props.filtered[0]} />
  );
};

export default Filter;
