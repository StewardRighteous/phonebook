const Notification = ({ message, error }) => {
  if (message === null) {
    return null;
  }

  return (
    <div
      style={{
        color: error ? "red" : "green",
        backgroundColor: "lightGrey",
        fontSize: 20,
        borderStyle: "solid",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
      }}
    >
      <p>{message}</p>
    </div>
  );
};

export default Notification;
