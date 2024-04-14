import PropTypes from "prop-types";
import { TextField } from "@mui/material";

const style = {
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
};

const WhiteTextField = ({
  label,
  variant = "outlined",
  type = "text",
  InputProps = {},
  onChange,
  required,
  width,
  defaultValue,
  value,
  disabled,
}) => {
  WhiteTextField.propTypes = {
    label: PropTypes.string.isRequired,
    variant: PropTypes.string,
    type: PropTypes.string,
    InputProps: PropTypes.object,
    onChange: PropTypes.func,
    required: PropTypes.bool,
    width: PropTypes.string,
    defaultValue: PropTypes.string,
    value: PropTypes.string,
    disabled: PropTypes.bool,
  };
  return (
    <TextField
      type={type}
      label={label}
      variant={variant}
      sx={{ ...style, width: width }}
      InputProps={InputProps}
      onChange={onChange}
      required={required}
      defaultValue={defaultValue}
      value={value}
      disabled={disabled}
    />
  );
};

export default WhiteTextField;
