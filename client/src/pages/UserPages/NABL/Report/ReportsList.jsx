import { Grid, Paper, Typography, styled } from "@mui/material";
import ListBox from "../../../../components/stickers/ListBox.jsx";
import { useSelector } from "react-redux";

import theme from "../../../../constants/theme.js";
import StyledLink from "../../../../components/stickers/StyledLink.jsx";

const ReportTypeBox = styled(Paper)({
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

const ReportsList = () => {
  const { reports } = useSelector((state) => state.nabl);

  return (
    <Grid container spacing={3}>
      <Grid item lg={6} md={12} sm={12} xs={12}>
        <Typography
          variant="h5"
          textAlign="center"
          style={{ color: "white", marginBottom: "20px" }}
        >
          Unauthorised Reports
        </Typography>
        <ReportTypeBox>
          {reports
            .filter((report) => !report.isAuthorised)
            .map((report) => (
              <StyledLink
                key={report._id}
                to={`unauthorised/${report.sampleCode}?analysisSet=${report.analysisSet}`}
              >
                <ListBox label={report.sampleCode + " " + report.analysisSet} />
              </StyledLink>
            ))}
        </ReportTypeBox>
      </Grid>
      <Grid item lg={6} md={12} sm={12} xs={12} style={{ paddingLeft: "10px" }}>
        <Typography
          variant="h5"
          textAlign="center"
          style={{ color: "white", marginBottom: "20px" }}
        >
          Authorised Reports
        </Typography>
        <ReportTypeBox>
          {reports
            .filter((report) => report.isAuthorised)
            .map((report) => (
              <StyledLink
                key={report._id}
                to={`authorised/${report.sampleCode}?analysisSet=${report.analysisSet}`}
              >
                <ListBox label={report.sampleCode + " " + report.analysisSet} />
              </StyledLink>
            ))}
        </ReportTypeBox>
      </Grid>
    </Grid>
  );
};

export default ReportsList;
