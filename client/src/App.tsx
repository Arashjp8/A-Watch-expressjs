import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
  return (
    <div className="font-lato flex flex-col items-center justify-between w-[100vw]">
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
