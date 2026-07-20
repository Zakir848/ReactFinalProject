import { Controller, useForm } from "react-hook-form";
import Footer from "../../components/Footer";
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import WorkOutlineIcon from "@mui/icons-material/WorkOutlineRounded";
import { useContextFunc } from "../../context/JobContext";

const CITIES = ["Baku", "Sumgait", "Absheron", "Ganja"];
const TYPES = ["Full-time", "Part-time", "Remote", "Contract", "Internship"];

export default function AddVacancy() {
  const { addVacancies, currentUser, loading, setLoading } = useContextFunc();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    try {
      setLoading(true);
      data.location = `${data.location}, Azerbaijan`;
      data.employer = currentUser?.companyName;
      data.employerId = currentUser?.id;

      addVacancies(data);
      reset();
    } catch (error) {
      console.log("Data Yuklenerken Problem oldu:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box sx={{ maxWidth: 720, mx: "auto", px: { xs: 2, sm: 3 }, py: 5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 2,
              bgcolor: "primary.main",
              color: "primary.contrastText",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <WorkOutlineIcon />
          </Box>
          <Box>
            <Typography variant="h5" fontWeight={800}>
              Post a vacancy
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Fill in the details below to publish a new job listing
            </Typography>
          </Box>
        </Box>

        <Paper
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            p: { xs: 2.5, sm: 4 },
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {/* Basic info */}
          <Box>
            <Typography
              variant="overline"
              color="text.secondary"
              fontWeight={700}
            >
              Basic information
            </Typography>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1.5 }}
            >
              <TextField
                label="Vacancy title"
                placeholder="e.g. Senior Frontend Developer"
                fullWidth
                error={!!errors.work}
                helperText={errors.work?.message}
                {...register("work", {
                  required: "Vacancy title is required",
                  minLength: {
                    value: 3,
                    message: "Minimum 3 characters required",
                  },
                })}
              />

              <TextField
                multiline
                rows={5}
                fullWidth
                label="Description"
                placeholder="Describe responsibilities, requirements, and benefits"
                error={!!errors.description}
                helperText={errors.description?.message}
                sx={{ "& textarea": { resize: "none" } }}
                {...register("description", {
                  required: "Description is required",
                  minLength: {
                    value: 10,
                    message: "Minimum 10 characters required",
                  },
                  maxLength: {
                    value: 350,
                    message: "Maximum 350 characters allowed",
                  },
                })}
              />
            </Box>
          </Box>

          {/* Details */}
          <Box>
            <Typography
              variant="overline"
              color="text.secondary"
              fontWeight={700}
            >
              Details
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 2,
                mt: 1.5,
              }}
            >
              <Controller
                name="type"
                control={control}
                rules={{ required: "Please select a vacancy type" }}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    fullWidth
                    label="Employment type"
                    error={!!errors.type}
                    helperText={errors.type?.message}
                  >
                    {TYPES.map((t) => (
                      <MenuItem key={t} value={t}>
                        {t}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />

              <Controller
                name="location"
                control={control}
                rules={{ required: "Please select a city" }}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    fullWidth
                    label="City"
                    error={!!errors.city}
                    helperText={errors.city?.message}
                    {...register("location")}
                  >
                    {CITIES.map((c) => (
                      <MenuItem key={c} value={c}>
                        {c}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />

              <TextField
                label="Monthly salary"
                type="number"
                fullWidth
                sx={{ gridColumn: { xs: "auto", sm: "1 / -1" } }}
                error={!!errors.salary}
                helperText={errors.salary?.message}
                InputProps={{
                  endAdornment: (
                    <Box
                      component="span"
                      sx={{ color: "text.secondary", fontSize: 14 }}
                    >
                      AZN
                    </Box>
                  ),
                }}
                {...register("salary", {
                  required: "Salary is required",
                  min: { value: 400, message: "Minimum salary is 400" },
                  valueAsNumber: true,
                })}
              />
            </Box>
          </Box>

          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{ height: 48, mt: 1 }}
            disabled={loading}
          >
            {loading ? (
              <Box sx={{ display: "flex" }}>
                <CircularProgress aria-label="Loading…" />
              </Box>
            ) : (
              "Publish vacancy"
            )}
          </Button>
        </Paper>
      </Box>
      <footer className="footer">
        <Footer />
      </footer>
    </>
  );
}
