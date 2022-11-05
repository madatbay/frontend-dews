import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "./axios.js";
import { useLocalStorage } from "./hooks/useLocalStorage.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  const login = (data) => {
    setUser(data);
    navigate("/profile");
  };

  const logout = () => {
    setUser(null);
    navigate("/auth/login", { replace: true });
  };

  useEffect(() => {
    const handleRefreshToken = async () => {
      await API.post("/user/token/refresh/", {
        refresh: user["refresh"],
      })
        .then((response) => {
          setUser({ refresh: user["refresh"], access: response.data.access });
        })
        .catch((error) => {
          console.error("Refresh token error: ", error);
          logout();
        });
    };

    let interval = setInterval(() => {
      if (user) {
        handleRefreshToken();
      }
    }, 1000 * 60 * 19);
    return () => clearInterval(interval);
  }, [user]);

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
