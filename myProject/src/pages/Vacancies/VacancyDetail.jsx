import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Avatar,
  Stack,
  Divider,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import { useContextFunc } from "../../context/JobContext";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import { useState } from "react";

function formatSalary(value) {
  if (!value) return "Razılaşma yolu ilə";
  return new Intl.NumberFormat("az-AZ").format(value);
}

export default function VacancyDetail() {
  const { vacancies, currentUser } = useContextFunc();
  const { vacancyId } = useParams();

  const navigate = useNavigate();

  const vacancy = vacancies.find((item) => item.id === vacancyId);

  const employerInitial =
    vacancy?.employer?.trim()?.charAt(0)?.toUpperCase() || "?";

  if (!vacancy) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          bgcolor: "background.default",
          color: "text.secondary",
          gap: 2,
        }}
      >
        <Typography variant="h5" color="text.primary">
          Vakansiya tapılmadı
        </Typography>
        <Typography variant="body2">
          Bu elan silinmiş və ya keçərsiz ola bilər.
        </Typography>
        <Button variant="outlined" onClick={() => navigate("/")}>
          Ana səhifəyə qayıt
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 3,
        position: "relative",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 680, mb: 2 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/")}
          sx={{ color: "text.secondary" }}
        >
          Vakansiyalara qayıt
        </Button>
      </Box>

      <Card sx={{ width: "100%", maxWidth: 680, p: 1 }}>
        <CardContent>
          <Stack direction="row" spacing={2} alignItems="center" mb={3}>
            <Avatar
              sx={{
                width: 60,
                height: 60,
                fontSize: 24,
                fontWeight: 700,
                bgcolor: "primary.main",
              }}
              aria-label={`${vacancy.employer} loqosu`}
            >
              {employerInitial}
            </Avatar>
            <Box>
              <Typography variant="h5">{vacancy.work}</Typography>
              <Typography variant="subtitle1" color="primary.main">
                {vacancy.employer}
              </Typography>
            </Box>
          </Stack>

          <Divider sx={{ mt: 1, mb: 3 }} />

          <Stack spacing={2} mb={4}>
            {vacancy.location && (
              <Stack
                direction="row"
                spacing={1.5}
                sx={{ placeItems: "center" }}
              >
                <LocationOnIcon
                  sx={{ color: "text.secondary", fontSize: 20 }}
                />
                <Typography variant="body1" color="text.secondary">
                  <Box
                    component="span"
                    color="text.primary"
                    fontWeight={600}
                    mr={0.5}
                  >
                    Location:{" "}
                  </Box>
                  {vacancy.location}
                </Typography>
              </Stack>
            )}

            <Stack direction="row" spacing={1.5} sx={{ placeItems: "center" }}>
              <WorkIcon sx={{ color: "text.secondary", fontSize: 20 }} />
              <Typography
                variant="body1"
                color="text.primary"
                sx={{ fontWeight: "600" }}
              >
                Employment Type:
              </Typography>
              {vacancy.type ? (
                <Chip
                  label={vacancy.type}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Not Specified
                </Typography>
              )}
            </Stack>

            <Stack direction="row" spacing={1.5} alignItems="baseline">
              <Typography variant="h5" color="success.main" fontWeight={800}>
                {formatSalary(vacancy.salary)}{" "}
                {vacancy.salary && (
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.secondary"
                  >
                    AZN / month
                  </Typography>
                )}
              </Typography>
            </Stack>
          </Stack>

          <Box
            sx={{
              bgcolor: "background.default",
              p: 2.5,
              mt: 1,
              borderRadius: 2,
              border: 1,
              borderColor: "divider",
            }}
          >
            <Typography
              variant="overline"
              color="text.secondary"
              sx={{ fontWeight: 700 }}
            >
              Job Description & Requirements
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              lineHeight={1.7}
              mt={1}
            >
              {vacancy.description || "Not find Description"}
            </Typography>
          </Box>

          {currentUser?.role === "Worker" && (
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 4, height: 50, fontSize: "16px" }}
              onClick={() =>
                currentUser
                  ? navigate(`/profile/cv/${vacancy.id}`)
                  : navigate("/signin")
              }
            >
              Apply Now
            </Button>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
