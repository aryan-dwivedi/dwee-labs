import axios from "axios";

const API_URL = "http://localhost:5500/users";

const auth_key = process.env.REACT_APP_AUTH_KEY;

export const fetchUsers = async () => {
  const response = await axios.get(`${API_URL}`, {
    headers: { authorization: auth_key },
  });
  return response.data.response;
};

export const createUser = async (user: { name: string; age: number; gender: string, email: string }) => {
  const response = await axios.post(`${API_URL}/create`, user, {
    headers: { authorization: auth_key },
  });
  return response.data.response;
};