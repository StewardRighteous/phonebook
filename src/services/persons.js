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

const updateNumber = (id, updatedObject) => {
  const req = axios.put(`${baseURL}/${id}`, updatedObject);
  return req.then((resp) => resp.data);
};

const deletePerson = (id) => {
  axios.delete(`${baseURL}/${id}`);
};

export default { getAll, createNew, updateNumber, deletePerson };
