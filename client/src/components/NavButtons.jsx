import { Box, Menu, MenuItem, styled } from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";

import CustomButton from "./stickers/CustomButton";
import StyledLink from "./stickers/StyledLink";
import theme from "../constants/theme";
import { useLocation, useNavigate } from "react-router-dom";

const NavBox = styled(Box)({
  display: "flex",
  gap: "30px",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: "50px",
  },
});

const NavButtons = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { userInfo } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <NavBox>
      {location.pathname.includes("/nabl/") && (
        <>
          <CustomButton
            text="Reception"
            color="white"
            background="#437478"
            borderColor="white"
            hoverBackground="#725f4d"
            hoverborderColor="white"
            onClick={() => navigate("/nabl/reception")}
            width={"125px"}
          />
          <CustomButton
            text="Analysis"
            color="white"
            background="#437478"
            borderColor="white"
            hoverBackground="#725f4d"
            hoverborderColor="white"
            onClick={() => navigate("/nabl/analysis")}
            width={"125px"}
          />
          <CustomButton
            text="Report"
            color="white"
            background="#437478"
            borderColor="white"
            hoverBackground="#725f4d"
            hoverborderColor="white"
            onClick={() => navigate("/nabl/report")}
            width={"125px"}
          />
        </>
      )}
      <CustomButton
        text="Home"
        color="white"
        background="#27187E"
        borderColor="white"
        hoverBackground="#CC2936"
        hoverborderColor="white"
        onClick={() => navigate("/home")}
      />
      <>
        <CustomButton
          text={userInfo.name}
          color="white"
          background="#27187E"
          borderColor="white"
          hoverBackground="#CC2936"
          hoverborderColor="white"
          onClick={handleClick}
        />
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          style={{ width: "100%" }}
        >
          <StyledLink to="/logout" style={{ color: "black" }}>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </StyledLink>
        </Menu>
      </>
    </NavBox>
  );
};

export default NavButtons;
