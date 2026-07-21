import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Stack,
  Divider,
  Switch,
  FormControlLabel,
  TextField,
  Button,
  Avatar,
  IconButton,
  Paper,
  Backdrop,
} from "@mui/material";

import { useForm } from "react-hook-form";
import { useContextFunc } from "../../context/JobContext";
import { Warning } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function SectionCard({ title, description, children }) {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent sx={{ p: 4 }}>
        <Typography variant="h6" mb={0.5}>
          {title}
        </Typography>
        {description && (
          <Typography variant="body2" color="text.secondary" mb={2.5}>
            {description}
          </Typography>
        )}
        {description && <Divider sx={{ mb: 2.5, mt: 1 }} />}
        <Stack spacing={2.5}>{children}</Stack>
      </CardContent>
    </Card>
  );
}

export default function UserAllDetail() {
  const profileForm = useForm();
  const passwordForm = useForm();

  const {
    currentUser,
    loading,
    isTurnOff,
    setIsTurnOff,
    changePassword,
    deleteUser,
  } = useContextFunc();
  const displayName = currentUser?.name || currentUser?.companyName || "";
  const initials = displayName.trim().charAt(0).toUpperCase() || "?";

  const { logOut } = useContextFunc();
  const [alertDelete, setAlertDelete] = useState(false);
  const navigate = useNavigate();

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
        <Typography color="text.secondary">Yüklənir...</Typography>
      </Box>
    );
  }

  if (!currentUser) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
        <Typography to={"/sign in"} color="text.secondary">
          Giriş etməlisiniz.
        </Typography>
      </Box>
    );
  }

  const role = currentUser.role === "Worker";
  const saveForm = () => {};

  const handleChangePassword = async (data) => {
    if (!data || !currentUser) return;
    delete data.repeadPassword;
    delete data.currentPassword;
    console.log(data);
    await changePassword(data.newPassword);
    passwordForm.reset();
  };

  const handleAlertCase = () => {
    setAlertDelete(!alertDelete);
  };

  const handleDeleteAccount = async () => {
    await deleteUser();
    logOut();
    navigate("/");
  };

  return (
    <>
      <Box sx={{ maxWidth: 680, mx: "auto", px: { xs: 2, sm: 3 }, py: 4 }}>
        <Typography variant="h5" fontWeight={800} sx={{ mb: "14px" }}>
          Setting
        </Typography>

        <SectionCard title="Profile" description="Change account details here">
          <Stack
            component="form"
            onSubmit={profileForm.handleSubmit(saveForm)}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {role ? (
              <>
                <TextField
                  label="Ad"
                  defaultValue={currentUser?.name}
                  fullWidth
                  error={!!profileForm.formState.errors?.name}
                  helperText={profileForm.formState.errors?.name?.message}
                  size="small"
                  {...profileForm.register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 3,
                      message: "Minimum 3 characters",
                    },
                  })}
                />
              </>
            ) : (
              <>
                <TextField
                  label="Company Name"
                  defaultValue={currentUser?.companyName}
                  fullWidth
                  error={!!profileForm.formState.errors?.companyName}
                  helperText={
                    profileForm.formState.errors?.companyName?.message
                  }
                  size="small"
                  {...profileForm.register("companyName", {
                    required: "Company name is required",
                    minLength: {
                      value: 2,
                      message: "Minimum 2 characters",
                    },
                  })}
                />
              </>
            )}

            <TextField
              label="Email"
              defaultValue={currentUser?.email || ""}
              fullWidth
              size="small"
              type="email"
              {...profileForm.register("email", {
                required: "Please, enter your email",
                minLength: {
                  value: 2,
                  message: "Please, enter minimum 2 charakter",
                },
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@(gmail\.com|mail\.ru)$/,
                  message: "Plase, set @gmail or @mail.ru ",
                },
              })}
            />
            <TextField
              label="Telefon"
              type="number"
              sx={{
                "& input[type=number]::-webkit-inner-spin-button": {
                  WebkitAppearance: "none",
                  margin: 0,
                },
              }}
              defaultValue={currentUser?.phone || ""}
              fullWidth
              size="small"
            />

            <Box>
              <Button variant="contained" type="submit">
                Save
              </Button>
            </Box>
          </Stack>
        </SectionCard>

        <SectionCard title="Notifications">
          <FormControlLabel
            control={
              <Switch
                checked={isTurnOff}
                onChange={(e) => setIsTurnOff(e.target.checked)}
              />
            }
            label="Notification when the application status changes"
          />
        </SectionCard>

        <Paper
          component="form"
          onSubmit={passwordForm.handleSubmit(handleChangePassword)}
        >
          <SectionCard title="Security">
            <TextField
              label="Current password"
              type="password"
              fullWidth
              size="small"
              error={!!passwordForm.formState.errors.currentPassword}
              helperText={
                passwordForm.formState.errors.currentPassword?.message
              }
              {...passwordForm.register("currentPassword", {
                required: "Current password is required",
                validate: (value) => {
                  return (
                    value === currentUser.password || "Current Password Wrong"
                  );
                },
              })}
            />
            <TextField
              label="New password"
              type="password"
              fullWidth
              size="small"
              error={!!passwordForm.formState.errors?.newPassword}
              helperText={passwordForm.formState.errors?.newPassword?.message}
              {...passwordForm.register("newPassword", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Please, enter minimum 8 charakter",
                },
                maxLength: {
                  value: 20,
                  message: "Please, enter maximum 20 charakter",
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/,
                  message:
                    "Minimum 1 upper and little letter, 1 Symbol, 1 digit",
                },
              })}
            />
            <TextField
              label="New password (repeat)"
              type="password"
              fullWidth
              size="small"
              error={!!passwordForm.formState.errors?.repeadPassword}
              helperText={
                passwordForm.formState.errors?.repeadPassword?.message
              }
              {...passwordForm.register("repeadPassword", {
                required: "Repead Password is required",
                validate: (value) =>
                  value === passwordForm.watch("newPassword") ||
                  "Passwords do not match!",
              })}
            />
            <Box>
              <Button variant="outlined" type="submit">
                Change Password
              </Button>
            </Box>
          </SectionCard>
        </Paper>

        <Card sx={{ borderColor: "error.main" }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" color="error.main" mb={0.5}>
              Delete Account
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2.5}>
              This operation cannot be undone. All data will be deleted.
            </Typography>
            <Button
              variant="outlined"
              color="error"
              onClick={handleAlertCase}
              sx={{ mt: 2 }}
            >
              Delete my account
            </Button>
            <Backdrop
              open={alertDelete}
              sx={{
                backdropFilter: "blur(8px)",
                backgroundColor: "rgba(0,0,0,.55)",
                zIndex: (theme) => theme.zIndex.drawer + 1,
              }}
            >
              <Box
                sx={{
                  width: {
                    xs: "92%",
                    sm: 420,
                  },
                  bgcolor: "background.paper",
                  borderRadius: 4,
                  p: 4,
                  boxShadow: 24,
                  textAlign: "center",
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: "error.main",
                    width: 70,
                    height: 70,
                    mx: "auto",
                    mb: 2,
                  }}
                >
                  <Warning sx={{ fontSize: 40 }} />
                </Avatar>

                <Typography variant="h5" fontWeight={700} gutterBottom>
                  Delete Account?
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{
                    mb: 3,
                    lineHeight: 1.7,
                  }}
                >
                  This action is permanent and cannot be undone.
                  <br />
                  Your profile, vacancies, messages and all personal information
                  will be permanently deleted.
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                  }}
                >
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => setAlertDelete(false)}
                  >
                    Cancel
                  </Button>

                  <Button
                    fullWidth
                    variant="contained"
                    color="error"
                    onClick={handleDeleteAccount}
                  >
                    Delete Account
                  </Button>
                </Box>
              </Box>
            </Backdrop>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
