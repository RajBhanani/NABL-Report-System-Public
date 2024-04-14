import PropTypes from "prop-types";
import { Paper, styled } from "@mui/material";

const StyledListPaper = styled(Paper)({
  width: "100%",
  padding: "1.5vh",
  display: "flex",
  fontSize: "24px",
  alignItems: "center",
  "&:hover": {
    cursor: "pointer",
    scale: "103%",
  },
});

const ListBox = ({ label }) => {
  ListBox.propTypes = {
    label: PropTypes.string.isRequired,
  };
  return <StyledListPaper>{label}</StyledListPaper>;
};

export default ListBox;
