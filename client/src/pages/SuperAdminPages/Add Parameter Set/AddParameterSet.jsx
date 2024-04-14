import { useState } from "react";
import {
  Alert,
  Box,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
  styled,
} from "@mui/material";
import WhiteTextField from "../../../components/stickers/WhiteTextField";
import StyledCheckbox from "../../../components/stickers/StyledCheckbox";
import CustomButton from "../../../components/stickers/CustomButton";
import theme from "../../../constants/theme";
import StyledRadio from "../../../components/stickers/StyledRadio";
import { useSelector } from "react-redux";
import { useCreateParamSetMutation } from "../../../redux/slices/api slices/nablApiSlice";

const AddParameterSetBox = styled(Box)({
  height: "70vh",
  width: "60%",
  padding: "5vh 5vh",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  justifyContent: "center",
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

const WhiteText = styled(Typography)({
  color: "white",
});

const AddParameterSet = () => {
  const [name, setName] = useState();
  const [type, setType] = useState("soil");
  const [setParameters, setSetParameters] = useState([]);

  const [createParamSet] = useCreateParamSetMutation();

  const { soilParameters, waterParameters } = useSelector(
    (state) => state.nabl.parameters
  );

  const parameters = type === "soil" ? soilParameters : waterParameters;

  const handleRadioChange = (value) => {
    setType(value);
    setSetParameters([]);
  };

  const handleCheckboxChange = (id) => {
    if (setParameters.findIndex((param) => param === id) === -1) {
      setSetParameters([...setParameters, id]);
    } else {
      setSetParameters(setParameters.filter((param) => param !== id));
    }
  };

  const [created, setCreated] = useState(false);
  const [errorInCreation, setErrorInCreation] = useState(null);

  const handleSubmit = async () => {
    try {
      await createParamSet({
        name: name,
        type: type,
        parameters: setParameters,
      }).unwrap();
      setCreated(true);
      setErrorInCreation(null);
    } catch (error) {
      setCreated(false);
      setErrorInCreation(error?.data?.message || error?.error);
    }
  };

  return (
    <AddParameterSetBox>
      <Grid container spacing={7}>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <WhiteTextField
            label="Parameter Set Name"
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <FormControl>
            <FormLabel>
              <WhiteText fontSize="18px">Parameter Set Type</WhiteText>
            </FormLabel>
            <RadioGroup
              value={type}
              onChange={(e) => handleRadioChange(e.target.value)}
              row
            >
              <FormControlLabel
                value="soil"
                control={<StyledRadio />}
                label={<WhiteText fontSize="18px">Soil</WhiteText>}
              />
              <FormControlLabel
                value="water"
                control={<StyledRadio />}
                label={<WhiteText fontSize="18px">Water</WhiteText>}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
      <FormControl style={{ height: "60%", overflowY: "auto" }}>
        <FormLabel>
          <WhiteText fontSize="18px">Select Parameters</WhiteText>
        </FormLabel>
        <FormGroup>
          <Grid container>
            {parameters.map((param) => (
              <Grid item key={param.paramId} lg={5} md={6} sm={6}>
                <FormControlLabel
                  label={<WhiteText>{param.paramName}</WhiteText>}
                  control={
                    <StyledCheckbox
                      checked={setParameters.includes(param.paramId)}
                      onChange={() => handleCheckboxChange(param.paramId)}
                    />
                  }
                />
              </Grid>
            ))}
          </Grid>
        </FormGroup>
      </FormControl>
      {created && <Alert severity="success">Parameter Set Created</Alert>}
      {errorInCreation && (
        <Alert severity="error">Error: {errorInCreation}</Alert>
      )}
      <CustomButton
        text="Create Set"
        color="white"
        background="green"
        borderColor="white"
        hoverColor="green"
        hoverBackground="none"
        hoverborderColor="green"
        onClick={handleSubmit}
        width="125px"
      />
    </AddParameterSetBox>
  );
};

export default AddParameterSet;
