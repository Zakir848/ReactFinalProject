import { Box } from "@mui/material";
import "./App.css";
import Footer from "./components/Footer";
import AppRouter from "./router/AppRouter";
import { ColorModeProvider } from "./theme";

function App() {
  return (
    <ColorModeProvider>
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Box component="main" sx={{ flexGrow: 1 }}>
          <AppRouter />
        </Box>
        <Footer />
      </Box>
    </ColorModeProvider>
  );
}

export default App;
