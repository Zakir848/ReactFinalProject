import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Avatar,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Divider,
  ListItemIcon,
  Select,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import Setting from "@mui/icons-material/Settings";
import Search from "@mui/icons-material/Search";
import Input from "@mui/material/InputBase";
import { useContextFunc } from "../context/JobContext";

export default function Header() {
  const { currentUser, logOut } = useContextFunc();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const displayName =
    currentUser?.name || currentUser?.companyName || "İstifadəçi";
  const initials = displayName.trim().charAt(0).toUpperCase() || "?";

  const handleLogout = () => {
    setAnchorEl(null);
    logOut();
    navigate("/");
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Toolbar
        sx={{ maxWidth: 1200, width: "100%", mx: "auto", px: { xs: 2, sm: 3 } }}
      >
        <Box
          component={Link}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            textDecoration: "none",
            color: "text.primary",
            flexGrow: 1,
          }}
        >
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              bgcolor: "primary.main",
              boxShadow: (theme) => `0 0 8px ${theme.palette.primary.main}`,
            }}
          />
          <Typography variant="h6" fontWeight={800} letterSpacing="-0.5px">
            JobTrack
          </Typography>
        </Box>

        <Box
          component={Link}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            textDecoration: "none",
            color: "text.primary",
            flexGrow: 1,
          }}
        >
          <Input
            placeholder="Seacrh user"
            sx={{
              bgcolor: "white",
              borderRadius: "20px",
              color: "black",
              padding: "0 10px",
            }}
          />
          <Search />
        </Box>

        {currentUser ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Hi, {displayName}
            </Typography>
            <IconButton
              onClick={(e) => setAnchorEl(e.currentTarget)}
              size="small"
              aria-controls={menuOpen ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={menuOpen ? "true" : undefined}
            >
              <Avatar
                sx={{
                  bgcolor: "primary.main",
                  width: 40,
                  height: 40,
                  fontSize: "15px",
                  fontWeight: 700,
                }}
              >
                {initials}
              </Avatar>
            </IconButton>
            <Menu
              id="account-menu"
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={() => setAnchorEl(null)}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <Box sx={{ px: 2, py: 1, display: { xs: "block", sm: "none" } }}>
                <Typography variant="body2" fontWeight={600}>
                  {displayName}
                </Typography>
              </Box>
              <Divider sx={{ display: { xs: "block", sm: "none" } }} />
              <MenuItem
                onClick={() => navigate("/setting")}
                sx={{ color: "primary.main", placeContent: "space-between" }}
              >
                <Setting>
                  <Setting fontSize="small" color="primary" />
                </Setting>
                Setting
              </MenuItem>

              <Divider sx={{ display: { xs: "block", sm: "none" } }} />

              <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" color="error" />
                </ListItemIcon>
                Log Out
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <Box sx={{ display: "flex", gap: 1.5 }}>
            <Button component={Link} to="/signin" color="inherit">
              Sign in
            </Button>
            <Button component={Link} to="/signup" variant="contained">
              Sign up
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
