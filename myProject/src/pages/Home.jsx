import React from "react";
import { useContextFunc } from "../context/JobContext";
import VacancyList from "./Vacancies/VacancyList";
import "../styles/Home.css"; 
import { Box } from "@mui/material";
import Footer from "../components/Footer";

export default function Home() {
  const { vacancies } = useContextFunc();

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", px: 3, position:"relative" }}>
      {/* hero + vacancies section */}
      <main className="home-page">
        <div className="home-hero">
          <h2>Find Your Dream Job Today</h2>
          <p>
            Explore thousands of open vacancies or build your company's career
            team.
          </p>
        </div>

        <section className="vacancies-section">
          <h3 className="section-title">Latest Vacancies</h3>
          <div className="vacancies-list-container">
            <VacancyList vacancies={vacancies} />
          </div>
        </section>
        <footer className="footer">
          <Footer />
        </footer>
      </main>
    </Box>
  );
}
