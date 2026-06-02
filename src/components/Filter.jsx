const Filter = ({ search, handleSearchChange }) => (
  <p>
    filter shown with{" "}
    <input type="text" value={search} onChange={handleSearchChange} />
  </p>
);

export default Filter;
