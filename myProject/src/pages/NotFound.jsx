import React from "react";
import { Box, Typography, Button, Stack, Chip } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#020617 0%,#0f172a 45%,#111827 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 3,
        position: "relative",
        overflow: "hidden",

        "&::before": {
          content: '""',
          position: "absolute",
          width: 450,
          height: 450,
          borderRadius: "50%",
          background: "#2563eb",
          opacity: 0.15,
          filter: "blur(180px)",
          top: -150,
          left: -150,
        },

        "&::after": {
          content: '""',
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "#7c3aed",
          opacity: 0.15,
          filter: "blur(180px)",
          bottom: -150,
          right: -150,
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 750,
          background: "rgba(255,255,255,.05)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,.08)",
          borderRadius: 6,
          p: 6,
          textAlign: "center",
          color: "white",
          boxShadow: "0 30px 80px rgba(0,0,0,.45)",
        }}
      >
        <ErrorOutlineIcon
          sx={{
            fontSize: 70,
            color: "#60a5fa",
            mb: 2,
          }}
        />

        <Typography
          sx={{
            fontSize: {
              xs: 80,
              md: 130,
            },
            fontWeight: 900,
            lineHeight: 1,
            background: "linear-gradient(135deg,#60a5fa,#8b5cf6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          404
        </Typography>

        <Typography variant="h4" fontWeight={700} mt={2}>
          Page Not Found
        </Typography>

        <Typography
          sx={{
            mt: 2,
            color: "#94a3b8",
            maxWidth: 500,
            mx: "auto",
            lineHeight: 1.8,
          }}
        >
          Sorry, the page you are looking for doesn't exist, may have been
          removed, or the URL is incorrect.
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          flexWrap="wrap"
          sx={{ justifyContent: "center", alignItems: "center", mt: "20px" }}
        >
          <Button
            variant="contained"
            startIcon={<HomeIcon />}
            onClick={() => navigate("/")}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 3,
              textTransform: "none",
              fontWeight: 700,
              background: "linear-gradient(135deg,#2563eb,#7c3aed)",

              "&:hover": {
                transform: "translateY(-2px)",
              },
            }}
          >
            Go Home
          </Button>

          <Button
            variant="outlined"
            startIcon={<WorkIcon />}
            onClick={() => navigate("/")}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 3,
              textTransform: "none",
              fontWeight: 700,
              color: "white",
              borderColor: "#334155",

              "&:hover": {
                borderColor: "#60a5fa",
                background: "rgba(96,165,250,.08)",
                transform: "translateY(-2px)",
              },
            }}
          >
            Browse Jobs
          </Button>
        </Stack>

        <Typography
          sx={{
            mt: 3,
            mb: 2,
            color: "#64748b",
            fontWeight: 600,
          }}
        >
          Popular Categories
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          flexWrap="wrap"
          useFlexGap
          sx={{ justifyContent: "center" }}
        >
          <Chip label="Frontend" />
          <Chip label="Backend" />
          <Chip label="React" />
          <Chip label="UI / UX" />
          <Chip label="Data Analyst" />
          <Chip label="DevOps" />
        </Stack>
      </Box>
    </Box>
  );
}
