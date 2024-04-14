import { createTheme } from "@mui/material";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 350,
      sm: 600,
      md: 900,
      lg: 1200,
    },
  },
});

export default theme