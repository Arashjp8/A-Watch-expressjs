import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MoviePage from "./pages/MoviePage";
import { MovieContextProvider } from "./context/MovieContext";
import Auth from "./pages/Auth";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div
      style={{ gridTemplateRows: "auto 1fr auto" }}
      className="min-h-screen font-lato grid grid-cols-1 items-center dark:bg-slate-900 dark:text-white "
    >
      <Navbar />
      <AuthProvider>
        <MovieContextProvider>
          <Routes>
            <Route
              element={<Auth formOfAuth={"register"} />}
              path={"/register"}
            />
            <Route element={<MoviePage />} path={"/movies/:id"} />
            <Route element={<Auth formOfAuth={"login"} />} path={"/login"} />
            <Route element={<PrivateRoute element={<Home />} />} path={"/"} />
          </Routes>
        </MovieContextProvider>
      </AuthProvider>
      <Footer />
    </div>
  );
}

export default App;
