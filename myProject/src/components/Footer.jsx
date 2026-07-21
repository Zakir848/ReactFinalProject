import { NavLink, useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import AddBox from "@mui/icons-material/AddBox";
import { useContextFunc } from "../context/JobContext";

export default function Footer() {
  const { currentUser } = useContextFunc();
  const navigate = useNavigate();

  const navItems = [
    {
      label: "Home",
      to: "/",
      icon: HomeRoundedIcon,
    },
    {
      label: currentUser?.role === "Employer" ? "Add Vacancy" : "Add CV",
      to: "/addVacancy",
      icon: AddBox,
      requiresAuth: true,
    },
    {
      label: "My Favorite",
      to: "/profile/myFavorite",
      icon: FavoriteRoundedIcon,
      requiresAuth: true,
    },
    {
      label: "Profile",
      to: currentUser ? `/profile/${currentUser.id}` : "/profile",
      icon: PersonRoundedIcon,
      requiresAuth: true,
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
      {navItems.map(({ label, to, icon: Icon, requiresAuth }) => (
        <Box
          key={label}
          component={NavLink}
          to={to}
          end={to === "/"}
          onClick={(e) => {
            if (requiresAuth && !currentUser) {
              e.preventDefault();
              navigate("/signin");
            }
          }}
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
                transition: "0.2s",
                "&:hover": {
                  color: "primary.main",
                },
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
