import React from "react";

import NotFound from "../pages/NotFound";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import PageLayout from "../components/PageLayout";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import UserAllDetail from "../pages/Users/UserAllDetail";
import VacancyDetail from "../pages/Vacancies/VacancyDetail";
import AddVacancy from "../pages/Vacancies/AddVacancy";
import UserFavorite from "../pages/Users/UserFavorite";
import UserCv from "../pages/Users/UserCv";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route path="/" element={<Home />} />

        <Route path="/vacancy/">
          <Route path=":id" element={<VacancyDetail />} />
        </Route>

        <Route path="/profile/">
          <Route path=":id" element={<UserAllDetail />} />
          <Route path="myFavorite" element={<UserFavorite />} />
          <Route path="cv" element={<UserCv />} />
        </Route>

        <Route path="/addVacancy" element={<AddVacancy />} />

        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
