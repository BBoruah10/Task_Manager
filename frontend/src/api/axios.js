import axios from "axios";

//communicate with the backend
//Axios returns a promise
//connect to backend using ingress
const API = axios.create({
  baseURL: "",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;