import { Box, styled } from "@mui/material";

import Navbar from "../../../components/Navbar";
import NABLHome from "./Home/NABLHome";
import { Route, Routes } from "react-router-dom";
import NABLReception from "./Reception/NABLReception";
import NABLAnalysis from "./Analysis/NABLAnalysis";
import NABLReport from "./Report/NABLReport";

import theme from "../../../constants/theme";

const NABLBackgroundBox = styled(Box)({
  background:
    "url(https://images.unsplash.com/photo-1545486332-ae6c3bf92201?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D) center",
  padding: "15vh 9vh 0vh 9vh",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  [theme.breakpoints.down("sm")]: {
    padding: "15vh 4vh 0vh 4vh",
  },
});

const Nabl = () => {

  return (
    <>
      <Navbar />
      <NABLBackgroundBox>
        <Routes>
          <Route path="/" element={<NABLHome />} />
          <Route path="/reception" element={<NABLReception />} />
          <Route path="/analysis/*" element={<NABLAnalysis />} />
          <Route path="/report/*" element={<NABLReport />} />
        </Routes>
      </NABLBackgroundBox>
    </>
  );
};

export default Nabl;
