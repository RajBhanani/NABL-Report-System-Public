import { useState } from "react";
import {
  Alert,
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  RadioGroup,
  Typography,
  styled,
} from "@mui/material";
import WhiteTextField from "../../../components/stickers/WhiteTextField";
import CustomButton from "../../../components/stickers/CustomButton";
import theme from "../../../constants/theme";
import { useCreateParamMutation } from "../../../redux/slices/api slices/nablApiSlice";
import StyledRadio from "../../../components/stickers/StyledRadio";

const AddParameterBox = styled(Box)({
  height: "80vh",
  width: "60%",
  padding: "2vh 3vh",
  display: "flex",
  flexDirection: "column",
  gap: "50px",
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

const AddParameter = () => {
  const [createParam] = useCreateParamMutation();

  const [paramName, setParamName] = useState();
  const [paramUnit, setParamUnit] = useState();
  const [paramType, setParamType] = useState("");
  const [paramVariables, setParamVariables] = useState([]);
  const [paramFormula, setParamFormula] = useState();
  const [paramTestMethod, setParamTestMethod] = useState();

  const handleChange = (index, value) => {
    paramVariables[index] = value;
    setParamVariables(paramVariables);
  };

  const [created, setCreated] = useState(null);
  const [errorInCreation, setErrorInCreation] = useState(null);

  const handleSubmit = async () => {
    const filteredVariables = paramVariables.filter(
      (variable) => variable !== ""
    );
    setParamVariables(filteredVariables);
    try {
      const { message } = await createParam({
        paramName: paramName,
        paramUnit: paramUnit,
        paramType: paramType,
        paramVariables: filteredVariables || null,
        paramFormula: paramFormula || null,
        paramTestMethod: paramTestMethod,
      }).unwrap();
      setCreated(message);
      setErrorInCreation(null);
    } catch (error) {
      setErrorInCreation(error?.data?.message || error.message);
      setCreated(null);
    }
  };

  return (
    <AddParameterBox>
      <WhiteText variant="h5">Add Parameter</WhiteText>
      <Grid container spacing={2}>
        <Grid item lg={4} md={4} sm={12} xs={12}>
          <WhiteTextField
            label="Parameter Name"
            onChange={(e) => setParamName(e.target.value)}
          />
        </Grid>
        <Grid item lg={4} md={4} sm={12} xs={12}>
          <WhiteTextField
            label="Parameter Unit"
            onChange={(e) => setParamUnit(e.target.value)}
          />
        </Grid>
        <Grid item lg={4} md={4} sm={12} xs={12}>
          <FormControl>
            <FormLabel>
              <WhiteText>Parameter Type</WhiteText>
            </FormLabel>
            <RadioGroup
              value={paramType}
              onChange={(e) => setParamType(e.target.value)}
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
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Box
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <WhiteText fontSize="17px">Parameter Variables</WhiteText>
            <Grid container spacing={4}>
              {paramVariables.map((value, index) => (
                <Grid item key={index} lg={3} md={4} sm={12} xs={12}>
                  <WhiteTextField
                    label={value}
                    onChange={(e) => handleChange(index, e.target.value)}
                  />
                </Grid>
              ))}
            </Grid>
            <CustomButton
              text="Add variable"
              color="white"
              background="#27187E"
              borderColor="white"
              hoverBackground="#CC2936"
              hoverborderColor="white"
              onClick={() => setParamVariables([...paramVariables, ""])}
              width="150px"
            />
          </Box>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <WhiteTextField
            label="Parameter Formula"
            onChange={(e) => setParamFormula(e.target.value)}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <WhiteTextField
            label="Parameter Test Method"
            onChange={(e) => setParamTestMethod(e.target.value)}
          />
        </Grid>
      </Grid>
      {created && <Alert severity="success">{created}</Alert>}
      {errorInCreation && <Alert severity="error">{errorInCreation}</Alert>}
      <CustomButton
        text="Create Parameter"
        color="white"
        background="green"
        borderColor="white"
        hoverColor="green"
        hoverBackground="none"
        hoverborderColor="green"
        onClick={handleSubmit}
        width="200px"
      />
    </AddParameterBox>
  );
};

export default AddParameter;
