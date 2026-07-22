import { useEffect, useMemo, useRef, useState } from "react";
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
  FormControl,
  InputLabel,
  Select,
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
import { flex } from "@mui/system";

export default function Header() {
  const { users, currentUser, logOut, isTurnOff, vacancies, notifications } =
    useContextFunc();
  const [searchParams, setSearchParams] = useSearchParams("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchAnchorEl, setSearchAnchorEl] = useState(null);
  const [type, setType] = useState("Username");
  const [showInput, setShowInput] = useState(false);
  const { mode, toggleMode } = useColorMode();
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const displayName =
    currentUser?.name || currentUser?.companyName || "İstifadəçi";
  const initials = displayName.trim().charAt(0).toUpperCase() || "?";

  const menuOpen = Boolean(anchorEl);
  const searchUsers = searchParams.get("username") || "";
  const searchCompanyName = searchParams.get("companyname") || "";
  const searchByTask = searchParams.get("searchbytask") || "";
  const searchMenuOpen =
    Boolean(searchAnchorEl) &&
    Boolean(searchUsers || searchCompanyName || searchByTask);

  const filterUsers = useMemo(() => {
    if (type === "SearchTask") return [];
    if (!searchUsers && !searchCompanyName) return [];

    return users.filter((user) =>
      type === "Username"
        ? user?.username?.toLowerCase().startsWith(searchUsers.toLowerCase())
        : user?.companyName
            ?.toLowerCase()
            .startsWith(searchCompanyName.toLowerCase()),
    );
  }, [users, searchUsers, searchCompanyName, type]);

  const filterVacancy = useMemo(() => {
    if (type !== "SearchTask" || !searchByTask) return [];

    return vacancies.filter((vacancy) =>
      vacancy?.work?.toLowerCase().startsWith(searchByTask.toLowerCase()),
    );
  }, [vacancies, searchByTask, type]);

  const myNotifications = useMemo(() => {
    if (!currentUser) return [];
    const isEmployer = currentUser.role === "Employer";

    return notifications.filter((notification) => {
      const vacancy = vacancies.find(
        (vacancy) => vacancy.id === notification.vacancyId,
      );
      if (!vacancy) return;

      return isEmployer
        ? vacancy.employerId === currentUser?.id
        : notification.userId === currentUser?.id;
    });
  }, [notifications, vacancies, currentUser]);

  const handleSearch = (e) => {
    const value = e.target.value;

    if (!searchAnchorEl) {
      setSearchAnchorEl(inputRef.current);
    }

    if (type === "Username") {
      setSearchParams(value ? { username: value } : {});
    } else if (type === "CompanyName") {
      setSearchParams(value ? { companyname: value } : {});
    } else if (type === "SearchTask") {
      setSearchParams(value ? { searchbytask: value } : {});
    }
  };

  const goToUser = (id) => {
    navigate(`/profile/${id}`);
    setSearchParams({});
    setSearchAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    logOut();
    navigate("/");
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
            sx={{
              textDecoration: "none",
              color: "text.primary",
              fontSize: { xs: "10px", lg: "20px" },
            }}
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
            fontSize: { xs: "5px" },
          }}
        >
          <FormControl
            sx={{
              maxWidth: { xs: 100, sm: 150 },
            }}
          >
            <InputLabel>Filter By</InputLabel>
            <Select
              value={type}
              label="Filter By"
              onChange={(e) => setType(e.target.value)}
              sx={{
                maxHeight: { xs: "30px", md: "40px" },
                maxWidth: { xs: "100px", sm: "100%" },
              }}
            >
              <MenuItem value="Username">Username</MenuItem>
              <MenuItem value="CompanyName">Company name</MenuItem>
              <MenuItem value="SearchTask">Search Task</MenuItem>
            </Select>
          </FormControl>
          <Input
            id="search"
            placeholder="Seacrh user"
            inputRef={inputRef}
            onChange={handleSearch}
            sx={{
              display: { xs: showInput ? "flex" : "none", sm: "flex" },
              padding: "0 4px",
            }}
          />

          <IconButton
            onClick={() => {
              (setShowInput(!showInput), inputRef.current.focus());
            }}
          >
            <Search />
          </IconButton>

          <Menu
            id="search-Menu"
            open={searchMenuOpen}
            anchorEl={searchAnchorEl}
            autoFocus={false}
            MenuListProps={{
              autoFocusItem: false,
            }}
            onClose={() => setSearchAnchorEl(null)}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            sx={{ maxHeight: "400px", height: "50%" }}
            disableAutoFocus
            disableEnforceFocus
            disableRestoreFocus
          >
            {type === "SearchTask" ? (
              filterVacancy.length > 0 ? (
                filterVacancy.map((vacancy) => (
                  <MenuItem
                    key={vacancy.id}
                    onClick={() => navigate(`/vacancy/${vacancy.id}`)}
                    sx={{ display: "block", placeItems: "end" }}
                  >
                    <Stack>{vacancy.work}</Stack>
                    <Stack
                      sx={{ placeItems: "center", placeContent: "center" }}
                    >
                      <span>
                        {vacancy.employer} <VerifiedSymbol />
                      </span>
                    </Stack>
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>Not Found Vacancy</MenuItem>
              )
            ) : filterUsers.length > 0 ? (
              filterUsers.map((user) => {
                console.log(user);

                const isWorker = user.role === "Worker";
                return (
                  <MenuItem
                    key={user?.id}
                    onClick={() => goToUser(user?.id)}
                    sx={{
                      display: "flex",
                      gap: 2,
                      mt: 1,
                      width: "100%",
                      placeContent: "space-between",
                      borderRadius: "10px",
                      "&:hover": { bgcolor: "background.default" },
                    }}
                  >
                    <Stack>
                      <Avatar sx={{ bgcolor: "primary.main" }}>
                        {isWorker ? user?.name?.[0] : user?.companyName?.[0]}
                      </Avatar>
                    </Stack>
                    <Stack sx={{ placeItems: "end", color: "text.primary" }}>
                      <span>
                        {isWorker
                          ? `${user.name} ${user.surname}`
                          : user.companyName}
                      </span>
                      <span>
                        <>@{user?.username}</>
                        {isWorker ? "" : <VerifiedSymbol />}
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

              <Stack
                direction="row"
                sx={{
                  display: { xs: "flex", sm: "none" },
                  width: "100%",
                  margin: "5px 0",
                  alignItems: "center",
                }}
              >
                <Switch checked={mode === "dark"} onChange={toggleMode} />
                {mode === "dark" ? (
                  <DarkModeRoundedIcon color="primary" />
                ) : (
                  <LightModeRoundedIcon color="primary" />
                )}
              </Stack>

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

        <IconButton
          onClick={() =>
            currentUser
              ? navigate("/profile/notifications")
              : navigate("/signin")
          }
        >
          <Badge
            badgeContent={
              isTurnOff
                ? myNotifications.filter((item) => item.status === "Pending")
                    .length
                : 0
            }
            color="error"
          >
            <Notification />
          </Badge>
        </IconButton>
        <Stack
          direction="row"
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            ml: 1,
          }}
        >
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
