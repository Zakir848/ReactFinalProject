import React from "react";

import NotFound from "../pages/NotFound";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import PageLayout from "../components/PageLayout";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import UserDetail from "../pages/Users/UserDetail";
import VacancyDetail from "../pages/Vacancies/VacancyDetail";
import Footer from "../components/Footer";
import Setting from "../pages/Setting";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route path="/" element={<Home />} />

        <Route path="/vacancy/">
          <Route path=":id" element={<VacancyDetail />} />
        </Route>

        <Route path="/profile/">
          <Route path=":id" element={<UserDetail />} />
        </Route>

        <Route path="/setting" element={<Setting />}></Route>
        <Route path="/addVacancy" element={<Footer />} />

        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
