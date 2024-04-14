import { Box, styled } from "@mui/material";

import theme from "../../../constants/theme";
import { Route, Routes } from "react-router-dom";
import ParametersList from "./ParametersList";
import OpenParameter from "./OpenParameter";

const EditParameterBox = styled(Box)({
  height: "80vh",
  width: "60%",
  padding: "2vh 3vh",
  display: "flex",
  flexDirection: "column",
  gap: "50px",
  alignItems: "center",
  background: "rgba(255,255,255, 0.15)",
  boxShadow: "0px 0px 10px white",
  backdropFilter: "blur(15px)",
  overflowY: "auto",
  [theme.breakpoints.down("md")]: {
    width: "90vw",
    height: "80vh",
  },
});

const EditParameters = () => {
  return (
    <EditParameterBox>
      <Routes>
        <Route path="/" element={<ParametersList />} />
        <Route path="/:type/:id" element={<OpenParameter />} />
      </Routes>
    </EditParameterBox>
  );
};

export default EditParameters;
