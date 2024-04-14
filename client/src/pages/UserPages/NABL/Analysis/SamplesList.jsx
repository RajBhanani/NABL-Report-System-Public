import {Grid, Paper, Typography, styled } from "@mui/material";
import ListBox from "../../../../components/stickers/ListBox.jsx";
import { useSelector } from "react-redux";

import theme from "../../../../constants/theme.js";
import StyledLink from "../../../../components/stickers/StyledLink.jsx";

const AnalysisTypeBox = styled(Paper)({
  display: "flex",
  height: "55vh",
  flexDirection: "column",
  gap: "1.5vh",
  overflowY: "auto",
  padding: "20px",
  backgroundColor: "rgba(255, 255, 255, 0.3)",
  [theme.breakpoints.down("sm")]: {
    height: "45vh",
    marginBottom: "5vh",
  },
});

const SamplesList = () => {
  const { samples } = useSelector((state) => state.nabl);
  return (
    <Grid container spacing={3}>
      <Grid item lg={6} md={12} sm={12} xs={12}>
        <Typography
          variant="h5"
          textAlign="center"
          style={{ color: "white", marginBottom: "20px" }}
        >
          Soil Samples
        </Typography>
        <AnalysisTypeBox>
          {samples
            .filter(
              (sample) => sample.sampleType === "soil" && !sample.isReported
            )
            .map((sample) => (
              <StyledLink key={sample.sampleCode} to={`${sample.sampleCode}`}>
                <ListBox label={sample.sampleCode} />
              </StyledLink>
            ))}
        </AnalysisTypeBox>
      </Grid>
      <Grid item lg={6} md={12} sm={12} xs={12}>
        <Typography
          variant="h5"
          textAlign="center"
          style={{ color: "white", marginBottom: "20px" }}
        >
          Water Samples
        </Typography>
        <AnalysisTypeBox>
          {samples
            .filter(
              (sample) => sample.sampleType === "water" && !sample.isReported
            )
            .map((sample) => (
              <StyledLink key={sample.sampleCode} to={`${sample.sampleCode}`}>
                <ListBox label={sample.sampleCode} />
              </StyledLink>
            ))}
        </AnalysisTypeBox>
      </Grid>
    </Grid>
  );
};

export default SamplesList;
