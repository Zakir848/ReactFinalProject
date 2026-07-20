import React, { createContext, useContext, useEffect, useState } from "react";
import {
  addUserToServer,
  getAllVacancies,
  getAllUsers,
  searchUsers,
  addVacanciesToServer,
  notification,
} from "../api/api";
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
  }, [users, vacancies]);

  useEffect(() => {
    const saved = localStorage.getItem("currentUser");
    if (saved) setCurrentUser(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("user");
    }
  }, [currentUser]);

  const searchUser = async (username) => {
    console.log(username);
    await searchUsers(username);
  };

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

  const addVacancies = async (data) => {
    try {
      await addVacanciesToServer(data);
    } catch (error) {
      console.log(error);
    }
  };

  const sendNotification = async (data) => {
    try {
      await notification(data);
    } catch (error) {
      console.log(error);
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
      value={{
        users,
        vacancies,
        currentUser,
        loading,
        setLoading,
        addUser,
        login,
        logOut,
        searchUser,
        addVacancies,
        sendNotification,
      }}
    >
      {children}
    </JobContextCreate.Provider>
  );
}

export function useContextFunc() {
  return useContext(JobContextCreate);
}
