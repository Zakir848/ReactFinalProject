import "./App.css";
import AppRouter from "./router/AppRouter";
import { ColorModeProvider } from "./theme";

function App() {
  return (
    <ColorModeProvider>
      <AppRouter />
    </ColorModeProvider>
  );
}

export default App;
