import { Link, NavLink } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import AddBox from "@mui/icons-material/AddBox";
import { useContextFunc } from "../context/JobContext";

export default function Footer() {
  const { currentUser } = useContextFunc();

  const navItems = [
    { label: "Home", to: "/", icon: HomeRoundedIcon, end: true },
    currentUser?.role === "Employer"
      ? { label: "Add Vacancy", to: "/addVacancy", icon: AddBox }
      : { label: "Salam Vacancy", to: "/addVacancy", icon: AddBox },
    {
      label: "Profile",
      to: currentUser ? `/profile/${currentUser.id}` : `/signin`,
      icon: PersonRoundedIcon,
    },
  ];

  return (
    <Box
      component="footer"
      sx={{
        position: "sticky",
        bottom: 0,
        left: 0,
        right: 0,
        bgcolor: "background.paper",
        borderTop: "1px solid",
        borderColor: "divider",
        display: "flex",
        justifyContent: "center",
        gap: { xs: 4, sm: 6 },
        py: 1.2,
        zIndex: 10,
      }}
    >
      {navItems.map(({ label, to, icon: Icon, end }) => (
        <Box
          key={to}
          component={NavLink}
          to={to}
          end={end}
          sx={{ textDecoration: "none" }}
        >
          {({ isActive }) => (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 0.3,
                color: isActive ? "primary.main" : "text.secondary",
                transition: "color 0.15s ease",
                "&:hover": { color: "primary.main" },
              }}
            >
              <Icon sx={{ fontSize: 24 }} />
              <Typography variant="caption" fontWeight={isActive ? 700 : 500}>
                {label}
              </Typography>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
}
