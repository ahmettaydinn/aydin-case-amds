import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Box, CssBaseline } from "@mui/material";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box>
      <CssBaseline />
      <Navbar />
      <Box>{children}</Box>
      <Footer />
    </Box>
  );
};

export default MainLayout;
