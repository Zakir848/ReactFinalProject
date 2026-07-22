import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { useContextFunc } from "../context/JobContext";
import PasswordField from "../components/PasswordField";

export default function SignIn() {
  const { users, login } = useContextFunc();
  const [loginFailed, setLoginFailed] = useState(false);
  const navigate = useNavigate();

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const foundUser = users.find(
      (item) => item.email === data.email && item.password === data.password,
    );

    if (!foundUser) {
      setLoginFailed(true);
      return;
    }

    setLoginFailed(false);
    login(foundUser);
    reset();
    navigate("/");
  };

  return (
    <Box sx={{ maxWidth: 420, mx: "auto", px: { xs: 2, sm: 3 }, py: 8 }}>
      <Typography
        variant="h5"
        fontWeight={800}
        sx={{ mb: 3, textAlign: "center" }}
      >
        Sign In
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
          {...register("password", { required: "Password is required" })}
        />

        {loginFailed && <Alert severity="error">Wrong email or password</Alert>}

        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{ height: 48, mt: 1 }}
        >
          Sign In
        </Button>

        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
          mt={1}
        >
          Don't have an account?{" "}
          <Box component={Link} to="/signup" sx={{ color: "primary.main" }}>
            Sign up
          </Box>
        </Typography>
      </Paper>
    </Box>
  );
}
