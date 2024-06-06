import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { VStack } from "@chakra-ui/react";

function App() {
  return (
    <VStack width={"100%"} height={"100vh"}>
      <Navbar />
      <Home />
      <Footer />
    </VStack>
  );
}

export default App;
