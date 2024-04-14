import { Box, styled } from "@mui/material";
import SamplesList from "./SamplesList";
import OpenSample from "./OpenSample";
import { Route, Routes } from "react-router-dom";

import theme from "../../../../constants/theme";

const NABLAnalysisBox = styled(Box)({
  width: "85%",
  height: "70vh",
  display: "flex",
  padding: "5vh 3vh",
  background: "rgba(255,255,255, 0.15)",
  boxShadow: "0px 0px 10px white",
  backdropFilter: "blur(15px)",
  overflowY: "auto",
  [theme.breakpoints.down("md")]: {
    width: "auto",
    height: "80vh",
  },
});

const NABLAnalysis = () => {
  return (
    <NABLAnalysisBox>
      <Routes>
        <Route path="/" element={<SamplesList />} />
        <Route path="/:sampleCode" element={<OpenSample />} />
      </Routes>
    </NABLAnalysisBox>
  );
};

export default NABLAnalysis;
