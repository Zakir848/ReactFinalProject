import { CheckBox } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useContextFunc } from "../../context/JobContext";

export default function UserCv() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const LANGUAGES = ["Russian", "English", "Azerbaijan"];

  const { addCv, currentUser } = useContextFunc();
  const onSubmit = async (data) => {
    if (!data) return;
    console.log(data);

    data.userId = currentUser?.id;

    await addCv(data);
    reset();
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", px: { xs: 2, sm: 3 }, py: 5 }}>
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
        <Typography variant="h5" fontWeight={800} mb={1}>
          My CV
        </Typography>

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
              pattern: {
                value: /^[a-zA-ZçÇğĞıİöÖşŞüÜəƏ]+$/,
                message: "Only letters",
              },
            })}
          />
        </Box>

        <TextField
          label="Phone number"
          fullWidth
          error={!!errors.phone}
          helperText={errors.phone?.message}
          {...register("phone", { required: "Phone number is required" })}
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

        <TextField
          label="Address"
          fullWidth
          error={!!errors.address}
          helperText={errors.address?.message}
          {...register("address", { required: "Address is required" })}
        />

        <TextField
          label="Education"
          fullWidth
          error={!!errors.education}
          helperText={errors.education?.message}
          {...register("education", {
            required: "Education is required",
          })}
        />

        <TextField
          label="About Yourself (optional)"
          fullWidth
          multiline
          rows={6}
          error={!!errors.description}
          helperText={errors.description?.message}
          {...register("description", {})}
        />

        <Box>
          <Typography variant="subtitle2" mb={0.5}>
            Languages
          </Typography>
          <FormGroup>
            {LANGUAGES.map((lang) => (
              <FormControlLabel
                key={lang}
                control={
                  <Checkbox
                    value={lang}
                    {...register("languages", {
                      required: "Select at least one language",
                    })}
                  />
                }
                label={lang}
              />
            ))}
          </FormGroup>
          {errors.languages && (
            <FormHelperText error>{errors.languages.message}</FormHelperText>
          )}
        </Box>

        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{ height: 48, mt: 1 }}
        >
          Save
        </Button>
      </Paper>
    </Box>
  );
}
