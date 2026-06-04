const Persons = ({ names }) => {
  return names.map((detail) => (
    <p key={detail.name}>
      {detail.name} {detail.number}
    </p>
  ));
};

export default Persons;
