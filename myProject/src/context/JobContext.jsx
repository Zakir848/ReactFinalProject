import React, { createContext, useContext, useEffect, useState } from "react";
import {
  addUserToServer,
  getAllVacancies,
  getAllUsers,
  searchUsers,
  addVacanciesToServer,
  addFavoriteToServer,
  getAllFavorites,
  deleteInServer,
  changePasswordFromServer,
  deleteUserInServer,
  addCvToServer,
  getAllCv,
  getAllNotification,
  AddNotificationToServer,
  changeNotificationStatus,
  changeAccountDetail,
} from "../api/api";

const JobContextCreate = createContext();

export default function JobContext({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [favorite, setFavorite] = useState([]);
  const [vacancies, setVacancies] = useState([]);
  const [cv, setCv] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isTurnOff, setIsTurnOff] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const usersInServer = await getAllUsers();
        const vacanciesInServer = await getAllVacancies();
        const favoriteInServer = await getAllFavorites();
        const cvInServer = await getAllCv();
        const notificationInServer = await getAllNotification();
        setUsers(usersInServer);
        setVacancies(vacanciesInServer);
        setFavorite(favoriteInServer);
        setCv(cvInServer);
        setNotifications(notificationInServer);
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

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
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

  const deleteUser = async () => {
    if (!currentUser) return;
    try {
      await deleteUserInServer(currentUser?.id);
    } catch (error) {
      console.log("Can not delete user: ", error);
    }
  };

  const addVacancies = async (data) => {
    try {
      await addVacanciesToServer(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addCv = async (data) => {
    if (!currentUser) return;

    try {
      await addCvToServer(data);
    } catch (error) {
      console.log(error);
    }
  };

  const changeNotificationFromStatus = async (id, status) => {
    try {
      await changeNotificationStatus(id, status);
      setNotifications((prev) =>
        prev.map((notif) => (notif.id === id ? { ...notif, status } : notif)),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const changeAccountDetailFromStatus = async (data) => {
    if (!currentUser) return;

    try {
      const isEmployer = currentUser?.role === "Employer";
      const payload = isEmployer
        ? {
            companyName: data.companyName,
            email: data.email,
            phone: data.phone,
          }
        : { name: data.name, email: data.email, phone: data.phone };

      const updatedUser = await changeAccountDetail(currentUser.id, payload);

      setCurrentUser(updatedUser);
      setUsers((prev) =>
        prev.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const sendNotification = async (data) => {
    try {
      await AddNotificationToServer(data);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleFavorite = async (vacancyId) => {
    if (!currentUser) return;

    if (!vacancyId) {
      console.error("toggleFavorite called without a vacancyId");
      return;
    }

    const existing = favorite.find(
      (fav) => fav.userId === currentUser.id && fav.vacancyId === vacancyId,
    );

    try {
      if (existing) {
        await deleteInServer(existing.id);
        setFavorite((prev) => prev.filter((fav) => fav.id !== existing.id));
        setIsClicked(false);
      } else {
        const newFavorite = await addFavoriteToServer({
          userId: currentUser.id,
          vacancyId,
        });
        setFavorite((prev) => [...prev, newFavorite]);
        setIsClicked(true);
      }
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    }
  };

  const changePassword = async (newPassword) => {
    if (!currentUser) return;

    try {
      console.log(currentUser?.id, newPassword);

      const update = await changePasswordFromServer(
        currentUser?.id,
        newPassword,
      );
      console.log(update);
      setCurrentUser(update);
    } catch (error) {
      console.log("Failed to change password:", error);
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
        favorite,
        notifications,
        cv,
        isClicked,
        isTurnOff,
        setIsTurnOff,
        setLoading,
        addUser,
        addCv,
        deleteUser,
        changePassword,
        changeAccountDetailFromStatus,
        login,
        logOut,
        changeNotificationFromStatus,
        searchUser,
        addVacancies,
        sendNotification,
        toggleFavorite,
      }}
    >
      {children}
    </JobContextCreate.Provider>
  );
}

export function useContextFunc() {
  return useContext(JobContextCreate);
}
