import { Grid } from "@mui/material";
import MenuBox from "../../components/MenuBox";
import StyledLink from "../../components/stickers/StyledLink";

const UserMenu = () => {
  return (
    <Grid
      container
      spacing={7}
      style={{ color: "white", display: "flex", justifyContent: "center" }}
    >
      <Grid item lg={4} md={4} sm={8} xs={12}>
        <StyledLink to="/nabl">
          <MenuBox text="NABL" />
        </StyledLink>
      </Grid>
    </Grid>
  );
};

export default UserMenu;
