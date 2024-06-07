import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
  return (
    <div className="flex flex-col items-center w-[100vw] h-[100%]">
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
