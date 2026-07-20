import React from "react";
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
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import PhotoCameraRoundedIcon from "@mui/icons-material/PhotoCameraRounded";
import { useForm } from "react-hook-form";
import { useContextFunc } from "../../context/JobContext";

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
        {description && <Divider sx={{ mb: 2.5 }} />}
        <Stack spacing={2.5}>{children}</Stack>
      </CardContent>
    </Card>
  );
}

export default function UserAllDetail() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { currentUser, loading, isTurnOff, setIsTurnOff } = useContextFunc();
  const displayName = currentUser?.name || currentUser?.companyName || "";
  const initials = displayName.trim().charAt(0).toUpperCase() || "?";

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

  return (
    <>
      <Box sx={{ maxWidth: 680, mx: "auto", px: { xs: 2, sm: 3 }, py: 4 }}>
        <Typography variant="h5" fontWeight={800} sx={{ mb: "14px" }}>
          Setting
        </Typography>

        {/* PROFİL */}
        <SectionCard
          title="Profil"
          description="Hesab məlumatlarını burada dəyiş"
        >
          <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
            <Box sx={{ position: "relative" }}>
              <Avatar
                sx={{
                  width: 72,
                  height: 72,
                  fontSize: 26,
                  fontWeight: 700,
                  bgcolor: "primary.main",
                }}
              >
                {initials}
              </Avatar>
              <IconButton
                size="small"
                sx={{
                  position: "absolute",
                  bottom: -4,
                  right: -4,
                  bgcolor: "background.paper",
                  border: "1px solid",
                  borderColor: "divider",
                  "&:hover": { bgcolor: "background.default" },
                }}
                aria-label="şəkli dəyiş"
              >
                <PhotoCameraRoundedIcon fontSize="small" />
              </IconButton>
            </Box>
            <Typography variant="body2" color="text.secondary">
              JPG və ya PNG, maks. 2MB
            </Typography>
          </Stack>
          <form
            onSubmit={handleSubmit(saveForm)}
            className="changeForm-userDetail"
          >
            {role ? (
              <>
                <TextField
                  label="Ad"
                  defaultValue={currentUser?.name}
                  fullWidth
                  size="small"
                  {...register("name")}
                />
              </>
            ) : (
              <>
                <TextField
                  label="Company Name"
                  defaultValue={currentUser?.companyName}
                  fullWidth
                  size="small"
                  {...register("companyName")}
                />
              </>
            )}

            <TextField
              label="Email"
              defaultValue={currentUser?.email || ""}
              fullWidth
              size="small"
              type="email"
              {...register("email")}
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
                Yadda saxla
              </Button>
            </Box>
          </form>
        </SectionCard>

        <SectionCard>
          <FormControl size="small" fullWidth>
            <InputLabel id="lang-label">Language</InputLabel>
            <Select labelId="lang-label" label="language" defaultValue="en">
              <MenuItem value="az">Azərbaycanca</MenuItem>
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="ru">Русский</MenuItem>
            </Select>
          </FormControl>
        </SectionCard>

        <SectionCard title="Bildirişlər">
          <FormControlLabel
            control={
              <Switch
                defaultChecked
                checked={isTurnOff}
                onClick={() => setIsTurnOff(!isTurnOff)}
              />
            }
            label="Müraciət statusu dəyişəndə bildiriş"
          />
        </SectionCard>

        <SectionCard title="Təhlükəsizlik">
          <TextField
            label="Cari şifrə"
            type="password"
            fullWidth
            size="small"
          />
          <TextField
            label="Yeni şifrə"
            type="password"
            fullWidth
            size="small"
          />
          <TextField
            label="Yeni şifrə (təkrar)"
            type="password"
            fullWidth
            size="small"
          />
          <Box>
            <Button variant="outlined">Şifrəni dəyiş</Button>
          </Box>
        </SectionCard>

        <Card sx={{ borderColor: "error.main" }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" color="error.main" mb={0.5}>
              Hesabı sil
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2.5}>
              Bu əməliyyat geri qaytarılmır. Bütün məlumatların silinəcək.
            </Typography>
            <Button variant="outlined" color="error" sx={{ mt: 2 }}>
              Hesabımı sil
            </Button>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
