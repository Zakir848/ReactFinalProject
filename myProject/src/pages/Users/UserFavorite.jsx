import { useContextFunc } from "../../context/JobContext";
import { Box, Typography, CircularProgress } from "@mui/material";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import VacancyList from "../Vacancies/VacancyList";

export default function UserFavorite() {
  const { favorite, vacancies, currentUser, loading } = useContextFunc();

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
        <CircularProgress size={28} />
      </Box>
    );
  }

  const favoriteVacancies = vacancies.filter((vac) =>
    favorite.some(
      (fav) => fav.userId === currentUser?.id && fav.vacancyId === vac.id,
    ),
  );

  return (
    <>
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          px: { xs: 2, sm: 3 },
          py: { xs: 3, sm: 5 },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 4 }}>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 2,
              bgcolor: "error.main",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FavoriteRoundedIcon />
          </Box>
          <Box>
            <Typography variant="h5" fontWeight={800}>
              My Favorites
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {favoriteVacancies.length > 0
                ? `${favoriteVacancies.length} saved vacanc${favoriteVacancies.length > 1 ? "ies" : "y"}`
                : "Vacancies you save will appear here"}
            </Typography>
          </Box>
        </Box>

        {favoriteVacancies.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              py: 10,
              borderRadius: 3,
              border: "1px dashed",
              borderColor: "divider",
            }}
          >
            <FavoriteRoundedIcon
              sx={{
                fontSize: 40,
                color: "text.secondary",
                mb: 1.5,
                opacity: 0.5,
              }}
            />
            <Typography variant="h6" color="text.primary" mb={1}>
              No favorites yet
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Tap the heart icon on any vacancy to save it here
            </Typography>
          </Box>
        ) : (
          <VacancyList vacancies={favoriteVacancies} />
        )}
      </Box>
    </>
  );
}
