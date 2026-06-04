import axios from "axios";

const baseURL = "http://localhost:3001/persons";

const getAll = () => {
  const req = axios.get(baseURL);
  return req.then((resp) => resp.data);
};

const createNew = (newObject) => {
  const req = axios.post(baseURL, newObject);
  return req.then((resp) => resp.data);
};

export default { getAll, createNew };
