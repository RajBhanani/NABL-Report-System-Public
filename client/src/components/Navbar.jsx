import { useState } from "react";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NavButtons from "./NavButtons";
import theme from "../constants/theme.js";

const StyledAppBar = styled(AppBar)({
  background: "none",
  display: "flex",
  justifyContent: "center",
  borderBottom: "1px solid white",
  color: "white",
  height: "9vh",
  width: "100%",
  backdropFilter: "blur(15px)"
});

const MenuIconButton = styled(IconButton)({
  display: "none",
  marginLeft: "-10px",
  [theme.breakpoints.down("md")]: {
    display: "block",
  },
});

const NavBox = styled(Box)({
  padding: "40px",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const ButtonWrapper = styled(Box)({
  display: "block",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
});

const Navbar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const list = () => {
    return (
      <Box>
        <List>
          <ListItem>
            <NavButtons />
          </ListItem>
        </List>
      </Box>
    );
  };
  return (
    <StyledAppBar>
      <Toolbar>
        <MenuIconButton color="inherit" onClick={handleDrawerOpen}>
          <MenuIcon />
        </MenuIconButton>
        <Drawer open={openDrawer} onClose={handleDrawerClose}>
          {list()}
        </Drawer>
        <NavBox>
          <Typography>NABL</Typography>
          <ButtonWrapper>
            <NavButtons />
          </ButtonWrapper>
        </NavBox>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;
