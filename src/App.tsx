import { CssBaseline } from "@mui/material";
import "./App.css";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import MainComponent from "./components/MainComponent";

function App() {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <MainComponent />
      <Footer />
    </>
  );
}

export default App;
