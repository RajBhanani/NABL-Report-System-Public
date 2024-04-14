import { Alert, Box, Grid, Typography, styled } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import WhiteTextField from "../../../components/stickers/WhiteTextField";
import CustomButton from "../../../components/stickers/CustomButton";
import { useUpdateParamMutation } from "../../../redux/slices/api slices/nablApiSlice";

const OpenParameterBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "20px",
});

const WhiteText = styled(Typography)({
  color: "white",
});

const OpenParameter = () => {
  const { type, id } = useParams();
  const { soilParameters, waterParameters } = useSelector(
    (state) => state.nabl.parameters
  );
  const parameters = type === "soil" ? soilParameters : waterParameters;

  const parameter = parameters.filter(
    (param) => param.paramId === Number(id)
  )[0];

  const [updateParam] = useUpdateParamMutation();

  const [paramName, setParamName] = useState(parameter.paramName);
  const [paramUnit, setParamUnit] = useState(parameter.paramUnit);
  const [paramVariables, setParamVariables] = useState(
    parameter.paramVariables
  );
  const [paramFormula, setParamFormula] = useState(parameter.paramFormula);
  const [paramTestMethod, setParamTestMethod] = useState(
    parameter.paramTestMethod
  );

  const [updated, setUpdated] = useState(null);
  const [errorInUpdation, setErrorInUpdation] = useState(null);

  const handleSubmit = async () => {
    const filteredVariables = paramVariables.filter(
      (variable) => variable !== ""
    );
    setParamVariables(filteredVariables);
    const trimmedFormula = paramFormula ? paramFormula.trim() : null;
    setParamFormula(trimmedFormula);
    try {
      await updateParam({
        paramId: parameter.paramId,
        paramType: type,
        paramName: paramName || null,
        paramUnit: paramUnit || null,
        paramTestMethod: paramTestMethod || null,
        paramFormula: trimmedFormula,
        paramVariables: filteredVariables,
      }).unwrap();
      setUpdated("Updated");
      setErrorInUpdation(null);
    } catch (error) {
      setErrorInUpdation(error?.data?.message || error?.error);
      setUpdated(null);
    }
  };

  return (
    <OpenParameterBox>
      <Grid container spacing={3}>
        <Grid item lg={4} md={12} sm={12} xs={12}>
          <WhiteText align="center">
            Parameter Id: {parameter.paramId}
          </WhiteText>
        </Grid>
        <Grid item lg={4} md={6} sm={12} xs={12}>
          <WhiteTextField
            label="Parameter Name"
            defaultValue={parameter.paramName}
            onChange={(e) => setParamName(e.target.value)}
          />
        </Grid>
        <Grid item lg={4} md={6} sm={12} xs={12}>
          <WhiteTextField
            label="Parameter Unit"
            defaultValue={parameter.paramUnit}
            onChange={(e) => setParamUnit(e.target.value)}
          />
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <WhiteTextField
            label="Parameter Test Method"
            defaultValue={parameter.paramTestMethod}
            width="100%"
            onChange={(e) => setParamTestMethod(e.target.value)}
          />
        </Grid>
        {paramFormula ? (
          <>
            <Grid item>
              <WhiteTextField
                label="Parameter Formula"
                defaultValue={parameter.paramFormula}
                onChange={(e) => setParamFormula(e.target.value)}
              />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <WhiteText>Parameter Variables</WhiteText>
              <Grid container spacing={2}>
                {paramVariables.map((variable, index) => (
                  <Grid item key={index}>
                    <WhiteTextField
                      label={`Variable ${index + 1}`}
                      defaultValue={variable}
                      onChange={(e) => {
                        paramVariables[index] = e.target.value;
                        setParamVariables(paramVariables);
                      }}
                    />
                  </Grid>
                ))}
                <Grid item>
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
                </Grid>
              </Grid>
            </Grid>
          </>
        ) : (
          <Grid item>
            <CustomButton
              text="Add Formula and Variables"
              color="white"
              background="#27187E"
              borderColor="white"
              hoverBackground="#CC2936"
              hoverborderColor="white"
              onClick={() => setParamFormula(" ")}
              width="150px"
            />
          </Grid>
        )}
      </Grid>
      {updated && <Alert severity="success">{updated}</Alert>}
      {errorInUpdation && <Alert severity="error">{errorInUpdation}</Alert>}
      <CustomButton
        text="Update Parameter"
        color="white"
        background="green"
        borderColor="white"
        hoverColor="green"
        hoverBackground="none"
        hoverborderColor="green"
        onClick={handleSubmit}
      />
    </OpenParameterBox>
  );
};

export default OpenParameter;
