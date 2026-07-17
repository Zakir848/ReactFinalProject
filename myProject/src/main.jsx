import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import JobContext from "./context/JobContext.jsx";

createRoot(document.getElementById("root")).render(
  <JobContext>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </JobContext>,
);
