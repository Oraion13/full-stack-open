const Filter = ({ filterName, searchName }) => {
  return (
    <>
      <form>
        filter show with: <input value={filterName} onChange={searchName} />
      </form>
    </>
  );
};

export default Filter;
