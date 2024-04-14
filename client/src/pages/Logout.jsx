import { Box, Button, styled } from "@mui/material";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../redux/slices/api slices/usersApiSlice";
import { deleteCredentials } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import {
  emptyParameters,
  emptySamples,
  emptyReports,
} from "../redux/slices/nablSlice";

const LogOutBox = styled(Box)({
  display: "flex",
  height: "100vh",
  justifyContent: "center",
  alignItems: "center",
  background: "black"
})

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      navigate("/");
      dispatch(deleteCredentials());
      dispatch(emptyParameters());
      dispatch(emptySamples());
      dispatch(emptyReports());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <LogOutBox>
      <Button variant="contained" onClick={handleLogout}>
        Logout
      </Button>
    </LogOutBox>
  );
};

export default Logout;
