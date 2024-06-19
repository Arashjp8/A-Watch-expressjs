import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MoviePage from "./pages/MoviePage";
import { MovieContextProvider } from "./context/MovieContext";

// FIX: height in bigger screens has a problem
// A-Watch client has the same problem
// TODO: Docerize the client side
// TODO: make a place holder for the credits cards when loading

function App() {
  return (
    <div className="font-lato flex flex-col items-center w-[100vw] h-full">
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
