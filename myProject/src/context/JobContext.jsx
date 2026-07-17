import React, { createContext, useContext, useEffect, useState } from "react";
import { addUserToServer, getAllVacancies, getAllUsers } from "../api/api";
import { set } from "react-hook-form";

const JobContextCreate = createContext();

export default function JobContext({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const users = await getAllUsers();
        const vacancies = await getAllVacancies();
        setUsers(users);
        setVacancies(vacancies);
      } catch (error) {
        console.error("Problem get process: ", error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("currentUser");
    if (saved) setCurrentUser(JSON.parse(saved));
  }, []);

  const addUser = async (data) => {
    try {
      setLoading(true);
      const newUser = await addUserToServer(data);
      setUsers((prev) => [...prev, newUser]);
      return newUser;
    } catch (error) {
      console.error("Failed to add user:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = (userData) => {
    try {
      setLoading(true);
      setCurrentUser(userData);
      localStorage.setItem("currentUser", JSON.stringify(userData));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const logOut = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <JobContextCreate.Provider
      value={{ users, vacancies, currentUser, loading, addUser, login, logOut }}
    >
      {children}
    </JobContextCreate.Provider>
  );
}

export function useContextFunc() {
  return useContext(JobContextCreate);
}
