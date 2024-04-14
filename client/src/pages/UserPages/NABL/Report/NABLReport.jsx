import { Box, styled } from "@mui/material";
import ReportsList from "./ReportsList";
import OpenUnauthorisedReport from "./OpenUnauthorisedReport";
import OpenAuthorisedReport from "./OpenAuthorisedReport";
import { Route, Routes } from "react-router-dom";

import theme from "../../../../constants/theme";

const NABLReportBox = styled(Box)({
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

const NABLReport = () => {
  return (
    <NABLReportBox>
      <Routes>
        <Route path="/" element={<ReportsList />} />
        <Route
          path="/unauthorised/:sampleCode"
          element={<OpenUnauthorisedReport />}
        />
        <Route
          path="/authorised/:sampleCode"
          element={<OpenAuthorisedReport />}
        />
      </Routes>
    </NABLReportBox>
  );
};

export default NABLReport;
