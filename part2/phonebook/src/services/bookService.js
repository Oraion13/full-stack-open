import axios from "axios";

const baseURL = "http://localhost:3001/persons";

const getAll = async () => {
  const request = axios.get(baseURL);
  const response = await request;
  return response.data;
};

const addContact = async (newNote) => {
  const request = axios.post(baseURL, newNote);
  const response = await request;
  return response.data;
};

const deleteContact = async (id) => {
  const request = axios.delete(`${baseURL}/${id}`);
  const response = await request;
  console.log(response);
  return response.status;
};

const updateContact = async (id, newContact) => {
  const request = axios.put(`${baseURL}/${id}`, newContact);
  const response = await request;
  console.log(response);
  return response.status;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  addContact,
  deleteContact,
  updateContact,
};
