import axios from "axios";

const jobTrack = axios.create({
  baseURL: "http://192.168.31.183:3000",
});

//users
export const searchUsers = async (id) => {
  const response = await jobTrack.get(`/users/${id}`);
  return response.data;
};

export const getAllUsers = async () => {
  const response = await jobTrack.get(`/users`);
  return response.data;
};

export const addUserToServer = async (data) => {
  const response = await jobTrack.post(`/users`, data);
  return response.data;
};

//Vacancies
export const getAllVacancies = async () => {
  const response = await jobTrack.get(`/vacancies`);
  return response.data;
};

export const addVacanciesToServer = async (data) => {
  const response = await jobTrack.post(`/vacancies  `, data);
  return response.data;
};

export const searchVacancy = async () => {
  const response = await jobTrack.get(`/vacancies`);
  return response.data;
};
