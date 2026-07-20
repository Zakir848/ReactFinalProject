import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";

// ---- Cihaz ölçüləri (breakpoint-lər) ----
// xs: telefon (0+), sm: böyük telefon/kiçik tablet (600+),
// md: tablet/kiçik noutbuk (900+), lg: noutbuk/masaüstü (1200+),
// xl: böyük ekran (1536+)
const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  },
};

const palettes = {
  dark: {
    mode: "dark",
    primary: { main: "#5B8DEF" },
    success: { main: "#3DD68C" },
    error: { main: "#F26D6D" },
    background: { default: "#0B0E14", paper: "#151922" },
    text: { primary: "#F4F5F7", secondary: "#8A8F98" },
    divider: "rgba(255,255,255,0.08)",
  },
  light: {
    mode: "light",
    primary: { main: "#3B6FE0" },
    success: { main: "#1E9E63" },
    error: { main: "#D64545" },
    background: { default: "#F6F7F9", paper: "#FFFFFF" },
    text: { primary: "#171A21", secondary: "#5B616E" },
    divider: "rgba(0,0,0,0.1)",
  },
};

function buildTheme(mode) {
  const palette = palettes[mode];

  let theme = createTheme({
    palette,
    breakpoints,
    shape: { borderRadius: 12 },
    spacing: 8, // 1 vahid = 8px, bütün sx-lərdə `mt: 2` → 16px

    typography: {
      fontFamily: `"Inter", "Segoe UI", sans-serif`,
      h3: { fontWeight: 800, letterSpacing: "-1px" },
      h5: { fontWeight: 700, letterSpacing: "-0.3px" },
      h6: { fontWeight: 700, letterSpacing: "-0.2px" },
      subtitle1: { fontWeight: 600 },
      button: { textTransform: "none", fontWeight: 600 },
    },

    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: palette.background.paper,
            border: `1px solid ${palette.divider}`,
            backgroundImage: "none",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: 10,
            // toxunma hədəfi mobil-də minimum 44px olsun (a11y standartı)
            [theme.breakpoints.down("sm")]: {
              minHeight: 44,
            },
          }),
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: ({ theme }) => ({
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            [theme.breakpoints.up("sm")]: {
              paddingLeft: theme.spacing(3),
              paddingRight: theme.spacing(3),
            },
            [theme.breakpoints.up("md")]: {
              paddingLeft: theme.spacing(4),
              paddingRight: theme.spacing(4),
            },
          }),
        },
      },
    },
  });

  // Başlıqlar (h1-h6) ekran ölçüsünə görə avtomatik miqyaslanır —
  // telefonda çox böyük başlıq görünməsinin qarşısını alır
  theme = responsiveFontSizes(theme);

  return theme;
}

// Mode idarəsi
const ColorModeContext = createContext({ mode: "dark", toggleMode: () => {} });
export const useColorMode = () => useContext(ColorModeContext);

export function ColorModeProvider({ children }) {
  const [mode, setMode] = useState(
    () => localStorage.getItem("colorMode") || "dark",
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
    localStorage.setItem("colorMode", mode);
  }, [mode]);

  const toggleMode = () =>
    setMode((prev) => (prev === "dark" ? "light" : "dark"));

  const activeTheme = useMemo(() => buildTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={{ mode, toggleMode }}>
      <MuiThemeProvider theme={activeTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  );
}