import { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
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
  Stack,
  Switch,
  Badge,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import Search from "@mui/icons-material/Search";
import Input from "@mui/material/Input";
import Notification from "@mui/icons-material/Notifications";
import { useContextFunc } from "../context/JobContext";
import { useColorMode } from "../theme";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import VerifiedSymbol from "./VerifiedSymbol";

export default function Header() {
  const { users, currentUser, logOut, isTurnOff } = useContextFunc();
  const [searchParams, setSearchParams] = useSearchParams("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchAnchorEl, setSearchAnchorEl] = useState(null);
  const { mode, toggleMode } = useColorMode();
  const navigate = useNavigate();

  const menuOpen = Boolean(anchorEl);
  const search = searchParams.get("username") || "";
  const searchMenuOpen = Boolean(searchAnchorEl) && search;

  const filterUsers = useMemo(() => {
    if (!search) return [];
    return users.filter((user) =>
      user?.username?.toLowerCase().startsWith(search.toLowerCase()),
    );
  }, [users, search]);

  const displayName =
    currentUser?.name || currentUser?.companyName || "İstifadəçi";
  const initials = displayName.trim().charAt(0).toUpperCase() || "?";

  const handleLogout = () => {
    setAnchorEl(null);
    logOut();
    navigate("/");
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchAnchorEl(e.currentTarget);
    if (value) {
      setSearchParams({
        username: value,
      });
    } else {
      setSearchParams({});
    }
  };

  const goToUser = (id) => {
    navigate(`/profile/${id}`);
    setSearchParams({});
    setSearchAnchorEl(null);
  };

  return (
    <AppBar
      position="sticky"
      elevation={1}
      sx={{
        display: "flex",
        bgcolor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Toolbar
        sx={{
          maxWidth: 1800,
          width: "100%",
          mx: "auto",
          px: { xs: 2, sm: 3 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
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
          <Typography
            component={Link}
            to="/"
            variant="h6"
            fontWeight={800}
            letterSpacing="-0.5px"
            sx={{ textDecoration: "none", color: "text.primary" }}
          >
            JobTrack
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            textDecoration: "none",
            color: "text.primary",
            flexGrow: 1,
          }}
        >
          <Input
            id="search"
            placeholder="Seacrh user"
            value={search}
            onChange={handleSearch}
            sx={{
              padding: "0 4px",
            }}
          />
          <Search />

          <Menu
            id="search-Menu"
            anchorEl={searchAnchorEl}
            open={searchMenuOpen}
            onClose={() => setSearchAnchorEl(null)}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            sx={{ maxHeight: "400px", height: "100%" }}
          >
            {filterUsers.length > 0 ? (
              filterUsers.map((user) => {
                const isWorker = user.role === "Worker";
                return (
                  <MenuItem
                    key={user?.id}
                    onClick={() => goToUser(user?.id)}
                    sx={{
                      display: "flex",
                      gap: 2,
                      mt: 2,
                      width: "100%",
                      borderRadius: "0",
                      placeContent: "space-between",
                      borderRadius: "10px",
                      "&:hover": { bgcolor: "background.default" },
                    }}
                  >
                    <Stack>
                      <Avatar sx={{ bgcolor: "primary.main" }}>
                        {isWorker ? user?.name[0] : user?.companyName[0]}
                      </Avatar>
                    </Stack>
                    <Stack sx={{ placeItems: "end", color: "text.primary" }}>
                      <span>
                        {isWorker
                          ? `${user.name} ${user.surname}`
                          : user.companyName}
                      </span>
                      <span>
                        {isWorker ? (
                          <>@{user?.username}</>
                        ) : (
                          <>
                            @{user?.username} <VerifiedSymbol />
                          </>
                        )}
                      </span>
                    </Stack>
                  </MenuItem>
                );
              })
            ) : (
              <MenuItem disabled>Nəticə tapılmadı</MenuItem>
            )}
          </Menu>
        </Box>

        {currentUser ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Typography
              variant="body2"
              sx={{
                display: { xs: "none", sm: "block" },
                color: "text.primary",
              }}
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

              <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" color="error" />
                </ListItemIcon>
                Log Out
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <Box sx={{ display: "flex", gap: 1.5, color: "primary.main" }}>
            <Button component={Link} to="/signin" color="inherit">
              Sign in
            </Button>
            <Button component={Link} to="/signup" variant="contained">
              Sign up
            </Button>
          </Box>
        )}

        <IconButton>
          <Badge badgeContent={isTurnOff ? 3 : 0} color="error">
            <Notification />
          </Badge>
        </IconButton>
        <Stack direction="row" sx={{ alignItems: "center", ml: 1 }}>
          <Switch checked={mode === "dark"} onChange={toggleMode} />
          {mode === "dark" ? (
            <DarkModeRoundedIcon color="primary" />
          ) : (
            <LightModeRoundedIcon color="primary" />
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
