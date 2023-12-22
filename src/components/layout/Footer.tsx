import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Fab from "@mui/material/Fab";
import MenuIcon from "@mui/icons-material/Menu";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";

const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: "0 auto",
});

const Footer = () => {
  return (
    <>
      <AppBar position="absolute" color="primary" sx={{ top: "auto" }}>
        <Toolbar disableGutters>
          <IconButton color="inherit" aria-label="open drawer">
            <MenuIcon />
          </IconButton>
          <StyledFab color="secondary" aria-label="add">
            <BeachAccessIcon />
          </StyledFab>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
          <IconButton color="inherit">
            <MoreIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Footer;
