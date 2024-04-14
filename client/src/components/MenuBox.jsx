import PropTypes from "prop-types";
import { Box, styled } from "@mui/material";
import theme from "../constants/theme";

const StyledMenuBox = styled(Box)({
  width: "100%",
  height: "150px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background:
    "radial-gradient(circle, rgba(245,245,245,1) 0%, rgba(197,197,197,1) 100%) ",
  border: "1px solid rgba(255,255,255, 0.2)",
  borderRadius: "5px",
  color: "black",
  "&:hover": { boxShadow: "0px 0px 13px rgba(255,255,255, 1)", scale: "102%" },
  fontSize: "24px",
  [theme.breakpoints.down("md")]: {
    height: "100px",
  },
});

const MenuBox = ({ text }) => {
  MenuBox.propTypes = {
    text: PropTypes.string.isRequired,
  };
  return <StyledMenuBox>{text}</StyledMenuBox>;
};

export default MenuBox;
