import { createContext, useState } from "react";
import API from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

 

  const login = async (email, password) => {
    const res = await API.post("/login", { email, password });
    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);
  };

  const register = async (name, email, password, role) => {
    const res = await API.post("/register", {
      name,
      email,
      password
    });
    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};