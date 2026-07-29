import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }

    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const res = await api.post("/auth/login", credentials);

    const authUser = {
      fullName: res.data.fullName,
      email: res.data.email,
      role: res.data.role,
    };

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(authUser));

    setUser(authUser);

    navigate("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);

    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLoggedIn: !!user,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
