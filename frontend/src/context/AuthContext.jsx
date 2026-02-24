import { createContext, useState, useEffect } from "react";
import API from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  // 🔥 Use undefined as initial state
  const [user, setUser] = useState(undefined);

  // 🔁 Restore session on refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const name = localStorage.getItem("name");

    if (token && role && name) {
      setUser({ token, role, name });
    } else {
      setUser(null);  // 🔥 important
    }
  }, []);

  // 🔐 LOGIN
  const login = async (email, password) => {
    const res = await API.post("/login", { email, password });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.role);
    localStorage.setItem("name", res.data.name);

    setUser({
      token: res.data.token,
      role: res.data.role,
      name: res.data.name,
    });
  };

  // 📝 REGISTER
  const register = async (name, email, password) => {
    await API.post("/register", {
      name,
      email,
      password,
    });

    await login(email, password);
  };

  // 🚪 LOGOUT
  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};