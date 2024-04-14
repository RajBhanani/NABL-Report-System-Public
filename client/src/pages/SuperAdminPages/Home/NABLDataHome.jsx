import {
  Box,
  Grid,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  styled,
  Alert,
  TableContainer,
} from "@mui/material";
import StyledLink from "../../../components/stickers/StyledLink";
import MenuBox from "../../../components/MenuBox";
import { useState } from "react";
import {
  useGetNablDataMutation,
  useUpdateNablDataMutation,
} from "../../../redux/slices/api slices/nablApiSlice";
import CustomButton from "../../../components/stickers/CustomButton";
import WhiteTextField from "../../../components/stickers/WhiteTextField";

const NABLDataHomeBox = styled(Box)({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  alignItems: "center",
});

const WhiteText = styled(Typography)({
  color: "white",
});

const NABLDataHome = () => {
  const [getNablData] = useGetNablDataMutation();
  const [updateNablData] = useUpdateNablDataMutation();

  const [currNablData, setCurrNablData] = useState(null);
  const [errorInFetch, setErrorInFetch] = useState(null);

  const [isEditing, setIsEdting] = useState(false);
  const [updateData, setUpdateData] = useState({});

  const getData = async () => {
    try {
      const { nablData } = await getNablData().unwrap();
      setCurrNablData(nablData);
    } catch (error) {
      setErrorInFetch(error);
    }
  };

  const handleChange = (field, value) => {
    setUpdateData({
      ...updateData,
      [field]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      await updateNablData({ updateData: updateData });
      await getData();
      setIsEdting(false);
    } catch (error) {
      setErrorInFetch(error);
    }
  };

  return (
    <NABLDataHomeBox>
      <Grid container spacing={4}>
        <Grid item lg={4} md={4} sm={8} xs={12}>
          <StyledLink to="addParameter">
            <MenuBox text="Add Parameter" />
          </StyledLink>
        </Grid>
        <Grid item lg={4} md={4} sm={8} xs={12}>
          <StyledLink to="addParameterSet">
            <MenuBox text="Add Parameter Set" />
          </StyledLink>
        </Grid>
        <Grid item lg={4} md={4} sm={8} xs={12}>
          <StyledLink to="editParameters">
            <MenuBox text="Edit Parameter" />
          </StyledLink>
        </Grid>
      </Grid>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "rgba(255,255,255, 0.15)",
          boxShadow: "0px 0px 10px white",
          backdropFilter: "blur(15px)",
        }}
      >
        {!currNablData ? (
          <CustomButton
            text={"Get Current NABL Data"}
            color="white"
            borderColor="white"
            hoverBackground="rgba(255,255,255,0.3)"
            hoverborderColor="white"
            onClick={getData}
          />
        ) : (
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              padding: "10px 0px",
              height: "60vh",
            }}
          >
            <WhiteText variant="h5">Current Stats</WhiteText>
            <TableContainer style={{ width: "100%" }}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <WhiteText>Current Year in Database</WhiteText>
                    </TableCell>
                    <TableCell>
                      <WhiteText>{currNablData.currentYear}</WhiteText>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <WhiteText>Current Soil Parameter ID</WhiteText>
                    </TableCell>
                    <TableCell>
                      <WhiteText>{currNablData.currentSoilParamId}</WhiteText>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <WhiteText>Current Water Parameter ID</WhiteText>
                    </TableCell>
                    <TableCell>
                      <WhiteText>{currNablData.currentWaterParamId}</WhiteText>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <WhiteText>Current Certification Number</WhiteText>
                    </TableCell>
                    <TableCell>
                      {!isEditing ? (
                        <WhiteText>
                          {currNablData.currentCertificationNumber}
                        </WhiteText>
                      ) : (
                        <WhiteTextField
                          label="Current Certification Number"
                          defaultValue={String(
                            currNablData.currentCertificationNumber
                          )}
                          onChange={(e) =>
                            handleChange(
                              "currentCertificationNumber",
                              Number(e.target.value)
                            )
                          }
                        />
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <WhiteText>Current Revision</WhiteText>
                    </TableCell>
                    <TableCell>
                      {!isEditing ? (
                        <WhiteText>{currNablData.currentRevision}</WhiteText>
                      ) : (
                        <WhiteTextField
                          label="Current Revision"
                          defaultValue={currNablData.currentRevision}
                          onChange={(e) =>
                            handleChange("currentRevision", e.target.value)
                          }
                        />
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <WhiteText>Current Soil Sample ID</WhiteText>
                    </TableCell>
                    <TableCell>
                      {!isEditing ? (
                        <WhiteText>{currNablData.currentSoilId}</WhiteText>
                      ) : (
                        <WhiteTextField
                          label="Current Soil Sample ID"
                          defaultValue={String(currNablData.currentSoilId)}
                          onChange={(e) =>
                            handleChange(
                              "currentSoilId",
                              Number(e.target.value)
                            )
                          }
                        />
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <WhiteText>Current Water Sample ID</WhiteText>
                    </TableCell>
                    <TableCell>
                      {!isEditing ? (
                        <WhiteText>{currNablData.currentWaterId}</WhiteText>
                      ) : (
                        <WhiteTextField
                          label="Current Water Sample ID"
                          defaultValue={String(currNablData.currentWaterId)}
                          onChange={(e) =>
                            handleChange(
                              "currentWaterId",
                              Number(e.target.value)
                            )
                          }
                        />
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <WhiteText>Analysed By</WhiteText>
                    </TableCell>
                    <TableCell>
                      {!isEditing ? (
                        <WhiteText>{currNablData.analysedBy}</WhiteText>
                      ) : (
                        <WhiteTextField
                          label="Analysed By"
                          defaultValue={String(currNablData.analysedBy)}
                          onChange={(e) =>
                            handleChange("analysedBy", e.target.value)
                          }
                        />
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <WhiteText>Approved By</WhiteText>
                    </TableCell>
                    <TableCell>
                      {!isEditing ? (
                        <WhiteText>{currNablData.approvedBy}</WhiteText>
                      ) : (
                        <WhiteTextField
                          label="Approved By"
                          defaultValue={String(currNablData.approvedBy)}
                          onChange={(e) =>
                            handleChange("approvedBy", e.target.value)
                          }
                        />
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            {!isEditing ? (
              <CustomButton
                text="Edit"
                color="white"
                borderColor="white"
                hoverBackground="rgba(255,255,255,0.3)"
                hoverborderColor="white"
                onClick={() => setIsEdting(true)}
              />
            ) : (
              <Box
                style={{
                  display: "flex",
                  gap: "20px",
                }}
              >
                <CustomButton
                  text="Cancel"
                  color="white"
                  background="red"
                  borderColor="white"
                  hoverColor="red"
                  hoverBackground="none"
                  hoverborderColor="red"
                  onClick={() => setIsEdting(false)}
                />
                <CustomButton
                  text="Submit"
                  width="100px"
                  color="white"
                  background="green"
                  borderColor="white"
                  hoverColor="green"
                  hoverBackground="none"
                  hoverborderColor="green"
                  onClick={handleSubmit}
                />
              </Box>
            )}
          </Box>
        )}
        {errorInFetch ? <Alert security="error">{errorInFetch}</Alert> : null}
      </Box>
    </NABLDataHomeBox>
  );
};

export default NABLDataHome;
