const Filter = ({ filterName, searchName }) => {
  return (
    <>
      <form>
        filter shown with: <input value={filterName} onChange={searchName} />
      </form>
    </>
  );
};

export default Filter;
