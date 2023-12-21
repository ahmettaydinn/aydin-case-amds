import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Box, CssBaseline } from "@mui/material";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box>
      <CssBaseline />
      <Navbar />
      <Box sx={{ height: "84vh" }}>{children}</Box>
      <Footer />
    </Box>
  );
};

export default MainLayout;
