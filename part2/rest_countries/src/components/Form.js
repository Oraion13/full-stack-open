const Form = (props) => {
  return (
    <form>
      find countries{" "}
      <input value={props.filterCountry} onChange={props.changeFilterCountry} />
    </form>
  );
};

export default Form;
