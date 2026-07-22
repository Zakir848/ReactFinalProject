import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  ToggleButtonGroup,
  ToggleButton,
  Alert,
} from "@mui/material";
import { useContextFunc } from "../context/JobContext";
import PasswordField from "../components/PasswordField";

export default function SignUp() {
  const { addUser, users } = useContextFunc();
  const [isCompany, setIsCompany] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const navigate = useNavigate();

  const {
    handleSubmit,
    reset,
    register,
    watch,
    unregister,
    formState: { errors },
  } = useForm();

  const currentDate = new Date().toISOString().split("T")[0];
  const today = new Date();

  // Ən yeni icazə verilən doğum günü (18 yaş) və ən köhnə (64 yaş)
  const youngestAllowed = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate(),
  )
    .toISOString()
    .split("T")[0];

  const oldestAllowed = new Date(
    today.getFullYear() - 64,
    today.getMonth(),
    today.getDate(),
  )
    .toISOString()
    .split("T")[0];

  const handleRoleChange = (e, newRole) => {
    if (!newRole) return;
    setIsCompany(newRole === "Employer");
    unregister(["email", "password", "repeadPassword", "name", "surname"]);
  };

  const onSubmit = (data) => {
    const role = isCompany ? "Employer" : "Worker";
    data.role = role;

    const existingUser = users.find(
      (user) => user.email === data.email && user.role === role,
    );

    if (existingUser) {
      setEmailExists(true);
      return;
    }
    setEmailExists(false);

    delete data.repeadPassword;

    if (role === "Employer") {
      delete data.name;
      delete data.surname;
      delete data.username;
      delete data.gender;
      delete data.birthday;
    } else {
      data.age = today.getFullYear() - Number(data.birthday.slice(0, 4));
    }

    addUser(data);
    reset();
    navigate("/");
  };

  return (
    <Box sx={{ maxWidth: 560, mx: "auto", px: { xs: 2, sm: 3 }, py: 5 }}>
      <Typography
        variant="h5"
        fontWeight={800}
        sx={{ mb: 3, textAlign: "center" }}
      >
        Sign Up
      </Typography>

      <Paper
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          p: { xs: 2.5, sm: 4 },
          display: "flex",
          flexDirection: "column",
          gap: 2.5,
        }}
      >
        <ToggleButtonGroup
          value={isCompany ? "Employer" : "Worker"}
          exclusive
          onChange={handleRoleChange}
          fullWidth
        >
          <ToggleButton value="Worker">Worker</ToggleButton>
          <ToggleButton value="Employer">Employer</ToggleButton>
        </ToggleButtonGroup>

        {emailExists && (
          <Alert severity="error">
            This email address is already in use. Please try a different one.
          </Alert>
        )}

        {isCompany ? (
          <>
            <TextField
              label="Email"
              type="email"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email format",
                },
              })}
            />

            <PasswordField
              label="Password"
              error={!!errors.password}
              helperText={errors.password?.message}
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/,
                  message:
                    "Minimum 1 uppercase, 1 lowercase, 1 symbol, 1 digit, 8+ chars",
                },
              })}
            />

            <PasswordField
              label="Repeat password"
              error={!!errors.repeadPassword}
              helperText={errors.repeadPassword?.message}
              {...register("repeadPassword", {
                required: "Please repeat your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
            />

            <TextField
              label="Company name"
              fullWidth
              error={!!errors.companyName}
              helperText={errors.companyName?.message}
              {...register("companyName", {
                required: "Company name is required",
              })}
            />

            <TextField
              label="Company Tax ID / VÖEN"
              fullWidth
              error={!!errors.voen}
              helperText={errors.voen?.message}
              {...register("voen", { required: "VÖEN is required" })}
            />

            <TextField
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              error={!!errors.foundingDate}
              helperText={
                errors.foundingDate?.message ||
                "Enter the company's founding date"
              }
              inputProps={{ max: currentDate }}
              {...register("foundingDate", {
                required: "Founding date is required",
              })}
            />
          </>
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <TextField
                label="Name"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
                {...register("name", {
                  required: "Name is required",
                  minLength: { value: 2, message: "Minimum 2 characters" },
                  pattern: {
                    value: /^[a-zA-ZçÇğĞıİöÖşŞüÜəƏ]+$/,
                    message: "Only letters",
                  },
                })}
              />
              <TextField
                label="Surname"
                fullWidth
                error={!!errors.surname}
                helperText={errors.surname?.message}
                {...register("surname", {
                  required: "Surname is required",
                  minLength: { value: 3, message: "Minimum 3 characters" },
                  pattern: {
                    value: /^[a-zA-ZçÇğĞıİöÖşŞüÜəƏ]+$/,
                    message: "Only letters",
                  },
                })}
              />
            </Box>

            <TextField
              label="Username"
              fullWidth
              error={!!errors.username}
              helperText={errors.username?.message}
              {...register("username", {
                required: "Username is required",
                pattern: {
                  value: /^[a-zA-Z][a-zA-Z0-9_]{3,20}$/,
                  message:
                    "Must start with a letter, 4-21 chars, letters/numbers/underscore",
                },
              })}
            />

            <TextField
              label="Email"
              type="email"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email format",
                },
              })}
            />

            <PasswordField
              label="Password"
              error={!!errors.password}
              helperText={errors.password?.message}
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/,
                  message:
                    "Minimum 1 uppercase, 1 lowercase, 1 symbol, 1 digit, 8+ chars",
                },
              })}
            />

            <PasswordField
              label="Repeat password"
              error={!!errors.repeadPassword}
              helperText={errors.repeadPassword?.message}
              {...register("repeadPassword", {
                required: "Please repeat your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
            />

            <TextField
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              error={!!errors.birthday}
              helperText={errors.birthday?.message}
              inputProps={{ min: oldestAllowed, max: youngestAllowed }}
              {...register("birthday", {
                required: "Date of birth is required",
                validate: (value) => {
                  if (value > youngestAllowed)
                    return "You must be at least 18 years old";
                  if (value < oldestAllowed)
                    return "You must be under 65 years old";
                  return true;
                },
              })}
            />

            <TextField
              select
              label="Gender"
              fullWidth
              defaultValue=""
              error={!!errors.gender}
              helperText={errors.gender?.message}
              {...register("gender", { required: "Please choose your gender" })}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
          </>
        )}

        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{ height: 48, mt: 1 }}
        >
          Sign Up
        </Button>
      </Paper>
    </Box>
  );
}
