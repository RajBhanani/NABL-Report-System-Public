import { Box, Grid, Typography, styled } from "@mui/material";

import theme from "../../../constants/theme";
import { useSelector } from "react-redux";
import StyledLink from "../../../components/stickers/StyledLink";

const WhiteText = styled(Typography)({
  color: "white",
});

const ParameterBox = styled(Box)({
  padding: "10px 30px",
  background:
    "radial-gradient(circle, rgba(245,245,245,1) 0%, rgba(197,197,197,1) 100%) ",
  border: "1px solid rgba(255,255,255, 0.2)",
  borderRadius: "5px",
  color: "black",
  "&:hover": { boxShadow: "0px 0px 13px rgba(255,255,255, 1)", scale: "102%" },
});

const ParametersLists = () => {
  const { soilParameters, waterParameters } = useSelector(
    (state) => state.nabl.parameters
  );

  return (
    <>
      <WhiteText variant="h5">Edit Parameters</WhiteText>
      <Grid container spacing={4}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <WhiteText variant="h5">Soil</WhiteText>
          <Grid container spacing={2}>
            {soilParameters.map((param) => (
              <Grid item key={param.paramId}>
                <StyledLink to={`./soil/${param.paramId}`}>
                  <ParameterBox>{param.paramName}</ParameterBox>
                </StyledLink>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <WhiteText variant="h5">Water</WhiteText>
          <Grid container spacing={2}>
            {waterParameters.map((param) => (
              <Grid item key={param.paramId}>
                <StyledLink to={`./water/${param.paramId}`}>
                  <ParameterBox>{param.paramName}</ParameterBox>
                </StyledLink>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ParametersLists;