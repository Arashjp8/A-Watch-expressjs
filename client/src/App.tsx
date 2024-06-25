import { Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MoviePage from "./pages/MoviePage";
import Auth from "./pages/Auth";
import "./App.css";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { state } = useAuthContext();
  const { user } = state;

  return (
    <div
      style={{ gridTemplateRows: "auto 1fr auto" }}
      className="min-h-screen font-lato grid grid-cols-1 items-center dark:bg-slate-900 dark:text-white "
    >
      <Navbar user={user} />
      <Routes>
        <Route
          path={"/"}
          element={user ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route
          path={"/movies/:id"}
          element={user ? <MoviePage /> : <Navigate to={"/login"} />}
        />
        <Route
          path={"/login"}
          element={
            !user ? <Auth formOfAuth={"login"} /> : <Navigate to={"/"} />
          }
        />
        <Route
          path={"/register"}
          element={
            !user ? <Auth formOfAuth={"register"} /> : <Navigate to={"/"} />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
