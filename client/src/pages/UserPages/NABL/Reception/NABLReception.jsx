import { Grid, Typography, styled } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

import WhiteTextField from "../../../../components/stickers/WhiteTextField";
import CustomButton from "../../../../components/stickers/CustomButton";
import CheckLists from "./CheckLists";
import WhiteDatePicker from "../../../../components/stickers/WhiteDatePicker";

const NABLCreateBox = styled(Box)({
  width: "100%",
  height: "75vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  alignItems: "center",
  padding: "30px 20px",
  gap: "4vh",
  background: "rgba(255,255,255, 0.15)",
  boxShadow: "0px 0px 10px white",
  backdropFilter: "blur(15px)",
  overflowY: "scroll",
});

const NABLReception = () => {
  const [type, setType] = useState("soil");

  const [newCase, setNewCase] = useState({
    sampleReceivedOn: null,
    sampleDetail: null,
    requestedBy: null,
    sampleCondOrQty: null,
    samplingBy: null,
    name: null,
    address: null,
    contactNo: null,
    farmName: null,
    surveyNo: null,
    prevCrop: null,
    nextCrop: null,
    analysisSet: [],
  });

  const handleTextChange = (targetName, targetValue) => {
    setNewCase({
      ...newCase,
      [targetName]: targetValue,
    });
  };

  const handleCheckboxChange = (name) => {
    let currentSets = newCase.analysisSet;
    if (currentSets.findIndex((set) => set.name === name) !== -1) {
      currentSets = currentSets.filter((set) => set.name !== name);
    } else {
      currentSets.push({ name: name, isReported: false });
    }
    setNewCase({ ...newCase, analysisSet: currentSets });
  };

  return (
    <NABLCreateBox>
      <Typography variant="h5" color="white">
        Sample Details
      </Typography>
      <Grid
        container
        spacing={4}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Grid item lg={3}>
          <WhiteDatePicker
            label="Sample Received On"
            onChange={(newValue) => {
              handleTextChange("sampleReceivedOn", newValue.$d);
            }}
          />
        </Grid>
        <Grid item lg={3}>
          <WhiteTextField
            label="Sample Detail"
            width="100%"
            onChange={(e) => {
              handleTextChange("sampleDetail", e.target.value);
            }}
          />
        </Grid>
        <Grid item lg={3}>
          <WhiteTextField
            label="Requested By"
            width="100%"
            onChange={(e) => {
              handleTextChange("requestedBy", e.target.value);
            }}
          />
        </Grid>
        <Grid item lg={3}>
          <WhiteTextField
            label="Sample Condition/Quantity"
            width="100%"
            onChange={(e) => {
              handleTextChange("sampleCondOrQty", e.target.value);
            }}
          />
        </Grid>
        <Grid item lg={3}>
          <WhiteTextField
            label="Name of the Farmer/Customer"
            width="100%"
            onChange={(e) => {
              handleTextChange("name", e.target.value);
            }}
          />
        </Grid>
        <Grid item lg={3}>
          <WhiteTextField
            label="Address"
            width="100%"
            onChange={(e) => {
              handleTextChange("address", e.target.value);
            }}
          />
        </Grid>
        <Grid item lg={3}>
          <WhiteTextField
            label="Contact No."
            width="100%"
            onChange={(e) => {
              handleTextChange("contactNo", e.target.value);
            }}
          />
        </Grid>
        <Grid item lg={3}>
          <WhiteTextField
            label="Farm Name"
            width="100%"
            onChange={(e) => {
              handleTextChange("farmName", e.target.value);
            }}
          />
        </Grid>
        <Grid item lg={3}>
          <WhiteTextField
            label="Survey No."
            width="100%"
            onChange={(e) => {
              handleTextChange("surveyNo", e.target.value);
            }}
          />
        </Grid>
        <Grid item lg={3}>
          <WhiteTextField
            label="Previous Crop"
            width="100%"
            onChange={(e) => {
              handleTextChange("prevCrop", e.target.value);
            }}
          />
        </Grid>
        <Grid item lg={3}>
          <WhiteTextField
            label="Next Crop"
            width="100%"
            onChange={(e) => {
              handleTextChange("nextCrop", e.target.value);
            }}
          />
        </Grid>
        <Grid item lg={3}>
          <WhiteTextField
            label="Sampling By"
            width="100%"
            onChange={(e) => {
              handleTextChange("samplingBy", e.target.value);
            }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} justifyContent="center">
        <Grid item>
          <CustomButton
            text=" Soil"
            width="100px"
            color="white"
            background="#725f4d"
            borderColor="white"
            hoverColor="#725f4d"
            hoverBackground="none"
            hoverborderColor="#725f4d"
            onClick={() => {
              setType("soil");
              setNewCase({ ...newCase, analysisSet: [] });
            }}
          />
        </Grid>
        <Grid item>
          <CustomButton
            text="Water"
            width="100px"
            color="white"
            background="#437478"
            borderColor="white"
            hoverColor="#437478"
            hoverBackground="none"
            hoverborderColor="#437478"
            onClick={() => {
              setType("water");
              setNewCase({ ...newCase, analysisSet: [] });
            }}
          />
        </Grid>
      </Grid>
      {
        <CheckLists
          type={type}
          newCase={newCase}
          handleCheckboxChange={handleCheckboxChange}
        />
      }
    </NABLCreateBox>
  );
};

export default NABLReception;
