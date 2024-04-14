import { Grid } from "@mui/material";
import StyledLink from "../../../../components/stickers/StyledLink";
import MenuBox from "../../../../components/MenuBox";

const NABLHome = () => {
  return (
    <Grid
      container
      spacing={4}
      style={{ color: "white", display: "flex", justifyContent: "center" }}
    >
      <Grid item lg={3} md={4} sm={8} xs={12}>
        <StyledLink to="/nabl/reception">
          <MenuBox text="Reception" />
        </StyledLink>
      </Grid>
      <Grid item lg={3} md={4} sm={8} xs={12}>
        <StyledLink to="/nabl/analysis">
          <MenuBox text="Analysis" />
        </StyledLink>
      </Grid>
      <Grid item lg={3} md={4} sm={8} xs={12}>
        <StyledLink to="/nabl/report">
          <MenuBox text="Report" />
        </StyledLink>
      </Grid>
    </Grid>
  );
};

export default NABLHome;
