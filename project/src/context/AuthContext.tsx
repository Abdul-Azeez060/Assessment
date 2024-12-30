import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "../types";
import axios, { AxiosError } from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface Message {
  success: boolean;
  message: string;
  data: object | null;
}

interface AuthContextType {
  user: User | null;
  login: (
    phone: string,
    name: string,
    type: "user" | "doctor"
  ) => { message: string; success: boolean };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (
    phone: string,
    name: string,
    type: "user" | "doctor"
  ) => {
    console.log(BACKEND_URL, "this is the backend url");
    try {
      const res = await axios.post(`${BACKEND_URL}/auth//sign-in`, {
        data: {
          phone,
          name,
        },
        role: type,
      });
      console.log(res.data, "this is the response from the backend");
      if (!res.data.success) {
        setUser(null);
        return { message: res.data.message, success: false };
      }

      setUser(res.data.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.data.token));
      return { message: res.data.message, success: true };
    } catch (error) {
      setUser(null);
      const axiosError = error as AxiosError;
      if (axiosError.response?.data) {
        const data = axiosError.response?.data! as Message;
        return { message: data.message, success: false };
      }
      console.log("this is in the error block");

      return { message: "An error occurred", success: false };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    //@ts-ignore
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  console.log("this is the context");
  return context;
};
