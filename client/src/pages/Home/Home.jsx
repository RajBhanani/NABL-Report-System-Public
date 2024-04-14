import { Box, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import UserMenu from "./UserMenu";
import SuperAdminMenu from "./SuperAdminMenu";
import {
  useGetParamsMutation,
  useGetReportsMutation,
  useGetSamplesMutation,
} from "../../redux/slices/api slices/nablApiSlice";
import { useEffect, useRef } from "react";
import {
  addReport,
  addSample,
  setParameters,
} from "../../redux/slices/nablSlice";

const HomeBackgroundBox = styled(Box)({
  background:
    "url(https://images.unsplash.com/photo-1637004732258-4b792ce8f474?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D) center/100vw",
  padding: "19vh 9vh",
  height: "100vh",
});

const Home = () => {
  const dispatch = useDispatch();

  const [getParams] = useGetParamsMutation();
  const [getSamples] = useGetSamplesMutation();
  const [getReports] = useGetReportsMutation();
  const hasRunEffect = useRef(false);

  const getData = async () => {
    const { nablParameters, parameterSets } = await getParams().unwrap();
    const { nablSamples } = await getSamples().unwrap();
    const { nablReports } = await getReports().unwrap();
    dispatch(setParameters({ ...nablParameters, parameterSets }));
    nablSamples.forEach((sample) => dispatch(addSample(sample)));
    nablReports.forEach((report) => dispatch(addReport(report)));
  };

  useEffect(() => {
    if (!hasRunEffect.current) {
      hasRunEffect.current = true;
      getData();
    }
  }, []);

  const { role } = useSelector((state) => state.auth).userInfo;
  return (
    <>
      <Navbar />
      <HomeBackgroundBox>
        {role === "superadmin" ? <SuperAdminMenu /> : <UserMenu />}
      </HomeBackgroundBox>
    </>
  );
};

export default Home;
