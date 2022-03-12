import axios from "axios";

const url = "http://localhost:3001";

const getCourses = async () => {
  const request = axios.get(`${url}/courseParts`);
  const response = await request;

  return response.data;
};

export default { getCourses };
