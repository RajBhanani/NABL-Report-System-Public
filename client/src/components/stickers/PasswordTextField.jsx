import { useState } from "react";
import PropTypes from "prop-types";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import WhiteTextField from "./WhiteTextField";

const PasswordTextField = ({ label = "Password", onChange, width }) => {
  PasswordTextField.propTypes = {
    label: PropTypes.string,
    onChange: PropTypes.func,
    width: PropTypes.string,
  };

  const [showPassword, setShowPassword] = useState(false);
  return (
    <WhiteTextField
      label={label}
      type={showPassword ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => setShowPassword(!showPassword)}
              style={{ color: "white" }}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      onChange={onChange}
      required={true}
      width={width}
    />
  );
};

export default PasswordTextField;
