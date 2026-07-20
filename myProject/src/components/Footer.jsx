import { NavLink } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import AddBox from "@mui/icons-material/AddBox";
import { useContextFunc } from "../context/JobContext";

export default function Footer() {
  const { currentUser } = useContextFunc();

  const navItems = [
    { label: "Home", to: "/", icon: HomeRoundedIcon, end: true },
    currentUser?.role === "Employer"
      ? { label: "Add Vacancy", to: "/addVacancy", icon: AddBox }
      : { label: "Add CV", to: "/addVacancy", icon: AddBox },
    {
      label: "My Favorite",
      to: currentUser ? `/profile/myFavorite` : `/signin`,
      icon: FavoriteRoundedIcon,
    },
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
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "sticky",
        bottom: 0,
        gap: 4,
        bgcolor: "background.paper",
        borderTop: "1px solid",
        borderColor: "divider",
        py: 1.2,
      }}
    >
      {navItems.map(({ label, to, icon: Icon, end }) => (
        <Box
          key={label}
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
