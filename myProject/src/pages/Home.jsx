import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useContextFunc } from "../context/JobContext";
import VacancyList from "./Vacancies/VacancyList";
import Footer from "../components/Footer";

export default function Home() {
  const { vacancies } = useContextFunc();

  return (
    <>
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 3, position: "relative" }}>
        <Box
          component="section"
          sx={{
            textAlign: "center",
            py: { xs: 6, sm: 8 },
            background: (theme) =>
              theme.palette.mode === "dark"
                ? "radial-gradient(circle at center, #1e1b4b 0%, #090d16 70%)"
                : "radial-gradient(circle at center, #e8ecfb 0%, #f6f7f9 70%)",
            borderRadius: 3,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              letterSpacing: "-1px",
              mb: 1.5,
              background: (theme) =>
                theme.palette.mode === "dark"
                  ? "linear-gradient(to right, #fff, #94a3b8)"
                  : "linear-gradient(to right, #171A21, #3B6FE0)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Find Your Dream Job Today
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 600, mx: "auto" }}>
            Explore thousands of open vacancies or build your company's career
            team.
          </Typography>
        </Box>

        <Box component="section" sx={{ mt: 5, mb: 7 }}>
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{
              borderLeft: "3px solid",
              borderColor: "primary.main",
              pl: 1.5,
              mb: 1,
            }}
          >
            Latest vacancies
          </Typography>
          <VacancyList vacancies={vacancies} />
        </Box>
      </Box>
      <footer className="footer">
        <Footer />
      </footer>
    </>
  );
}
