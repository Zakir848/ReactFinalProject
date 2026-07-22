import axios from "axios";

const jobTrack = axios.create({
  baseURL: "http://localhost:3000",
});

//users
export const searchUsers = async (username) => {
  const response = await jobTrack.get(`/users?username=${username}`);
  return response.data;
};

export const getAllUsers = async () => {
  const response = await jobTrack.get(`/users`);
  return response.data;
};

export const getAllVacancies = async () => {
  const response = await jobTrack.get(`/vacancies`);
  return response.data;
};

export const getAllFavorites = async () => {
  const response = await jobTrack.get("/favorite");
  return response.data;
};

export const getAllNotification = async () => {
  const response = await jobTrack.get("/notifications");
  return response.data;
};

export const getAllCv = async () => {
  const response = await jobTrack.get("/cv");
  return response.data;
};

export const addUserToServer = async (data) => {
  const response = await jobTrack.post(`/users`, data);
  return response.data;
};

export const AddNotificationToServer = async (data) => {
  const response = await jobTrack.post("/notifications", data);
  return response.data;
};

export const changePasswordFromServer = async (userId, newPassword) => {
  const response = await jobTrack.patch(`/users/${userId}`, {
    password: newPassword,
  });
  console.log(response.data);

  return response.data;
};

export const deleteUserInServer = async (id) => {
  const response = await jobTrack.delete(`/users/${id}`);
  return response.data;
};
//AAAA

export const addCvToServer = async (data) => {
  const response = await jobTrack.post(`/cv/`, data);
  return response.data;
};

//Vacancies

export const addVacanciesToServer = async (data) => {
  const response = await jobTrack.post(`/vacancies`, data);
  return response.data;
};

export const searchVacancy = async () => {
  const response = await jobTrack.get(`/vacancies`);
  return response.data;
};

//Notification

export const changeNotificationStatus = async (id, status) => {
  const response = await jobTrack.patch(`/notifications/${id}`, {
    status: status,
  });
  return response.data;
};

export const addFavoriteToServer = async (data) => {
  const response = await jobTrack.post("/favorite", data);
  return response.data;
};

export const deleteInServer = async (id) => {
  const response = await jobTrack.delete(`/favorite/${id}`);
  return response.data;
};
