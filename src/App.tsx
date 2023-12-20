import { Box, CssBaseline } from "@mui/material";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import MainComponent from "./components/MainComponent";

function App() {
  return (
    <Box sx={{ height: "100vh", width: "100vw" }}>
      <CssBaseline />
      <Navbar />
      <MainComponent />
      <Footer />
    </Box>
  );
}

export default App;
