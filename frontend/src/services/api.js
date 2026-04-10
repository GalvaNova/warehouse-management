import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

export const login = async (email, password) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

export const getItems = async (token) => {
  const response = await api.get("/items", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
