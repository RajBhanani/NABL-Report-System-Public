import PropTypes from "prop-types";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

const WhiteDatePicker = ({ onChange, label }) => {
  WhiteDatePicker.propTypes = {
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={["DatePicker", "DatePicker"]}
        sx={{
          marginTop: -1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <DatePicker
          label={label}
          format="DD-MM-YY"
          sx={{
            width: "100%",
            "& .MuiInputLabel-root, & .MuiInputLabel-root.Mui-focused, & .MuiInputBase-root":
              {
                color: "white",
              },
            "& .MuiOutlinedInput-root, & .MuiOutlinedInput-root.Mui-focused": {
              "& > fieldset": { borderColor: "white" },
            },
            "& .MuiOutlinedInput-root:hover": {
              "& > fieldset": {
                borderColor: "white",
                backgroundColor: "rgba(255,255,255,0.2)",
              },
            },
            "& .MuiInputBase-input.Mui-disabled": {
              color: "white",
            },
          }}
          onChange={onChange}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default WhiteDatePicker;
