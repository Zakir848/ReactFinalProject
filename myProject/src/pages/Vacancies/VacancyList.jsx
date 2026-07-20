import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Divider,
  Avatar,
  Stack,
  Checkbox,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useContextFunc } from "../../context/JobContext";

function formatSalary(value) {
  return value ? new Intl.NumberFormat("az-AZ").format(value) : "—";
}

export default function VacancyList({ vacancies }) {
  const { toggleFavorite, currentUser, favorite } = useContextFunc();
  const navigate = useNavigate();

  if (!vacancies || vacancies.length === 0) {
    return (
      <Box
        sx={{
          textAlign: "center",
          py: 10,
          borderRadius: 3,
          border: "1px dashed",
          borderColor: "divider",
          mt: 4,
        }}
      >
        <Typography variant="h6" color="text.primary" mb={1}>
          Hazırda vakansiya tapılmadı
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Daha sonra yenidən yoxlayın və ya filtrləri dəyişin
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(auto-fill, minmax(320px, 1fr))",
        },
        gap: 2.5,
        py: 3,
        width: "100%",
      }}
    >
      {vacancies.map((vacancy) => {
        const initial =
          vacancy.employer?.trim()?.charAt(0)?.toUpperCase() || "?";
        const isFavorite = favorite.some(
          (fav) => (
            currentUser?.id === fav.userId,
            fav.vacancyId === vacancy.id
          ),
        );
        return (
          <Card
            key={vacancy.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              transition: "border-color 0.2s ease, transform 0.2s ease",
              "&:hover": {
                borderColor: "primary.main",
                transform: "translateY(-3px)",
              },
              "&:active": { transform: "translateY(0)" },
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Stack
                direction="row"
                spacing={1.5}
                sx={{ placeContent: "space-between", placeItems: "center" }}
                mb={2}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: 1.5,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "primary.main",
                      width: 42,
                      height: 42,
                      fontWeight: 700,
                    }}
                    aria-label={`${vacancy.employer} loqosu`}
                  >
                    {initial}
                  </Avatar>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography variant="subtitle1" noWrap>
                      {vacancy.employer}
                    </Typography>
                    {vacancy.location && (
                      <Stack
                        direction="row"
                        spacing={0.5}
                        sx={{ placeItems: "center" }}
                      >
                        <LocationOnIcon
                          sx={{ fontSize: 14, color: "text.secondary" }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          {vacancy.location}
                        </Typography>
                      </Stack>
                    )}
                  </Box>
                </Box>
                <Checkbox
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                  checked={isFavorite}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(vacancy.id);
                  }}
                />
              </Stack>

              <Divider sx={{ mt: 1, mb: 3 }} />

              <Stack
                direction="row"
                spacing={1}
                sx={{ placeItems: "center" }}
                mb={0.5}
              >
                <WorkIcon
                  sx={{ fontSize: 18, color: "primary.main", mt: 0.3 }}
                />
                <Typography variant="h6">{vacancy.work}</Typography>
              </Stack>

              <Box mt="auto" pt={1}>
                <Typography variant="overline" color="text.secondary">
                  Monthly salary
                </Typography>
                <Typography variant="h5" color="success.main" fontWeight={800}>
                  {formatSalary(vacancy.salary)} ₼
                </Typography>
              </Box>
            </CardContent>

            <CardActions sx={{ px: 2, pb: 2, pt: 0 }}>
              <Button
                variant="contained"
                fullWidth
                endIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
                onClick={() => navigate(`/vacancy/${vacancy.id}`)}
                sx={{ height: 42 }}
              >
                Learn more
              </Button>
            </CardActions>
          </Card>
        );
      })}
    </Box>
  );
}
