import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#5B8DEF" },
    success: { main: "#3DD68C" },
    background: { default: "#0B0E14", paper: "#12151C" },
    text: { primary: "#F4F5F7", secondary: "#8A8F98" },
    divider: "rgba(255,255,255,0.08)",
  },
  MuiCard: {
    styleOverrides: {
      root: {
        backgroundColor: "#151922", // paper-dan bir az açıq, kontrast üçün
        border: "1px solid rgba(255,255,255,0.08)",
        backgroundImage: "none",
      },
    },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: `"Inter", "Segoe UI", sans-serif`,
    h5: { fontWeight: 700, letterSpacing: "-0.3px" },
    h6: { fontWeight: 700, letterSpacing: "-0.2px" },
    subtitle1: { fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          border: "1px solid rgba(255,255,255,0.08)",
          backgroundImage: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 10 },
      },
    },
  },
});
