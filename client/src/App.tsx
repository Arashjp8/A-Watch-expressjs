import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MoviePage from "./pages/MoviePage";
import { MovieContextProvider } from "./context/MovieContext";

// TODO: Docerize the client side

function App() {
  return (
    <div className="font-lato flex flex-col items-center w-[100vw] h-full dark:bg-slate-950 dark:text-white ">
      <Navbar />
      <MovieContextProvider>
        <Routes>
          <Route element={<Home />} path={"/"} />
          <Route element={<MoviePage />} path={"/movies/:id"} />
        </Routes>
      </MovieContextProvider>
      <Footer />
    </div>
  );
}

export default App;
