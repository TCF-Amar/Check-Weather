import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import WeatherProvider from "./context/WeatherContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter
    future={{
      v7_startTransition: true, // Enable React.startTransition for smoother updates
      v7_relativeSplatPath: true, // Update splat route resolution behavior
    }}
  >
    <WeatherProvider>
      <App />
    </WeatherProvider>
  </BrowserRouter>
);
