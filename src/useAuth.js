import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "./axios.js";
import { useLocalStorage } from "./hooks/useLocalStorage.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const [userData, setUserData] = useState();
  const navigate = useNavigate();

  const login = (data) => {
    setUser(data);
    navigate("/");
  };

  const logout = () => {
    setUser(null);
    navigate("/auth/login", { replace: true });
  };

  useEffect(() => {
    if (user) {
      API.get("/user/user/me/")
        .then((res) => setUserData(res.data))
        .catch((err) => console.error("Cannot fetch user data: ", err));
    }
  }, [user]);

  const value = useMemo(
    () => ({
      user,
      userData,
      login,
      logout,
    }),
    [user, userData]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
