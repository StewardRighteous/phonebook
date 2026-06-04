const Persons = ({ names, handleDeletePerson }) => {
  return names.map((detail) => (
    <p key={detail.name}>
      {detail.name} {detail.number}
      <button onClick={() => handleDeletePerson(detail)}>Delete</button>
    </p>
  ));
};

export default Persons;
