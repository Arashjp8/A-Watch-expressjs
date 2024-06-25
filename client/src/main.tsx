import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import { MovieContextProvider } from "./context/MovieContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <MovieContextProvider>
          <App />
        </MovieContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
