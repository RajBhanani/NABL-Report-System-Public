import PropTypes from "prop-types";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";

import { useCreateSampleMutation } from "../../../../redux/slices/api slices/nablApiSlice.js";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSample } from "../../../../redux/slices/nablSlice.js";

import StyledCheckbox from "../../../../components/stickers/StyledCheckbox.jsx";
import CustomButton from "../../../../components/stickers/CustomButton.jsx";

const CheckLists = ({ type, newCase, handleCheckboxChange }) => {
  CheckLists.propTypes = {
    type: PropTypes.string.isRequired,
    newCase: PropTypes.object.isRequired,
    handleCheckboxChange: PropTypes.func.isRequired,
  };

  const dispatch = useDispatch();

  const [createSample] = useCreateSampleMutation();

  const [created, setCreated] = useState(null);
  const [errorInCreation, setErrorInCreation] = useState(null);

  let { parameters } = useSelector((state) => state.nabl);

  const { parameterSets } = parameters;

  parameters =
    type === "soil" ? parameters.soilParameters : parameters.waterParameters;

  const handleSubmit = async () => {
    try {
      const {
        sampleReceivedOn,
        sampleDetail,
        analysisSet,
        requestedBy,
        sampleCondOrQty,
        samplingBy,
        name,
        address,
        contactNo,
        farmName,
        surveyNo,
        prevCrop,
        nextCrop,
      } = newCase;
      const { newSample } = await createSample({
        sampleReceivedOn,
        sampleType: type,
        sampleDetail,
        analysisSet,
        requestedBy,
        sampleCondOrQty,
        name,
        address,
        contactNo,
        farmName,
        surveyNo,
        prevCrop,
        nextCrop,
        samplingBy,
      }).unwrap();
      dispatch(addSample(newSample));
      setErrorInCreation(null);
      setCreated(newSample.sampleCode);
    } catch (error) {
      setCreated(null);
      setErrorInCreation(error?.data?.message || error.error);
    }
  };

  return (
    <>
      <Box
        style={{
          border: "2px solid white",
          borderRadius: "5px",
        }}
      >
        <FormControl sx={{ m: 3 }} variant="outlined" component="fieldset">
          <FormLabel
            style={{ color: "white", fontSize: "20px", marginBottom: "20px" }}
          >
            {type[0].toUpperCase()}
            {type.slice(1)} Analysis Set
          </FormLabel>
          <FormGroup style={{ color: "white" }}>
            {parameterSets
              .filter((set) => set.type === type)
              .map((set) => (
                <FormControlLabel
                  key={set.name}
                  control={
                    <StyledCheckbox
                      name={set.name}
                      checked={
                        newCase.analysisSet.findIndex(
                          (item) => item.name === set.name
                        ) !== -1
                      }
                      onChange={(event) =>
                        handleCheckboxChange(event.target.name)
                      }
                    />
                  }
                  label={
                    <Accordion
                      style={{ background: "transparent", color: "white" }}
                    >
                      <AccordionSummary>{set.name}</AccordionSummary>
                      <AccordionDetails>
                        <ol style={{ padding: "10%" }}>
                          {parameters
                            .filter((param) =>
                              set.parameters.includes(param.paramId)
                            )
                            .map((param) => (
                              <li key={param.paramId}>{param.paramName}</li>
                            ))}
                        </ol>
                      </AccordionDetails>
                    </Accordion>
                  }
                />
              ))}
          </FormGroup>
        </FormControl>
      </Box>
      {created ? (
        <Alert severity="success">
          New sample created, the sample code is: {created}
        </Alert>
      ) : errorInCreation ? (
        <Alert severity="error">Error in creation {errorInCreation}</Alert>
      ) : null}
      <CustomButton
        text="Submit"
        color="white"
        background="green"
        borderColor="white"
        hoverColor="green"
        hoverBackground="none"
        hoverborderColor="green"
        onClick={handleSubmit}
      />
    </>
  );
};

export default CheckLists;
