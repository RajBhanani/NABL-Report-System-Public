import {
  Alert,
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  styled,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import GeneratePDFComponent from "./GeneratePDFComponent";
import WhiteTextField from "../../../../components/stickers/WhiteTextField";
import { useState } from "react";
import CustomButton from "../../../../components/stickers/CustomButton";
import { useUpdateSampleMutation } from "../../../../redux/slices/api slices/nablApiSlice";
import { updateSampleState } from "../../../../redux/slices/nablSlice";

const OpenAuthorisedReportBox = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
});

const WhiteText = styled(Typography)({
  color: "white",
});

const OpenAuthorisedReport = () => {
  const { sampleCode } = useParams();
  const [searchParams] = useSearchParams();
  const analysisSet = searchParams.get("analysisSet");

  const dispatch = useDispatch();

  let { samples, parameters, reports } = useSelector((state) => state.nabl);

  const sample = samples.filter(
    (sample) => sample.sampleCode === sampleCode
  )[0];
  const report = reports.filter(
    (report) =>
      report.sampleCode === sampleCode && report.analysisSet === analysisSet
  )[0];
  parameters =
    sampleCode[2] === "S"
      ? parameters.soilParameters
      : parameters.waterParameters;

  samples = [];
  reports = [];

  const [updateSample] = useUpdateSampleMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [updateData, setUpdateData] = useState({});
  const [updated, setUpdated] = useState();
  const [errorInUpdate, setErrorInUpdate] = useState();

  const handleChange = (field, value) => {
    setUpdateData({
      ...updateData,
      [field]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const { message } = await updateSample({
        sampleCode: sample.sampleCode,
        updateData: updateData,
      }).unwrap();
      if (message === "Updated") {
        const keys = Object.keys(updateData);
        keys.forEach((key) =>
          dispatch(
            updateSampleState({
              sampleCode: sample.sampleCode,
              field: key,
              value: updateData[key],
            })
          )
        );
        setIsEditing(false);
        setUpdated(true);
        setErrorInUpdate(null);
        setTimeout(() => {
          setUpdated(false);
        }, 3000);
      }
    } catch (error) {
      setUpdated(false);
      setErrorInUpdate(error?.data?.message || error?.error);
    }
  };

  return (
    <OpenAuthorisedReportBox>
      <Grid container spacing={4}>
        <Grid item lg={6} md={12} sm={12} xs={12}>
          <WhiteText variant="h6" align="center">
            Customer Details
          </WhiteText>
          <TableContainer
            component={Box}
            style={{
              height: "50vh",
              overflowY: "auto",
              width: "100%",
              overflowX: "hidden",
            }}
          >
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <WhiteText align="center">Sample Received On</WhiteText>
                  </TableCell>
                  <TableCell>
                    <WhiteText align="center">
                      {new Date(sample.sampleReceivedOn).toDateString() ||
                        "Not Provided"}
                    </WhiteText>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <WhiteText align="center">Sample Type</WhiteText>
                  </TableCell>
                  <TableCell>
                    <WhiteText align="center">
                      {sample.sampleType || "Not Provided"}
                    </WhiteText>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <WhiteText align="center">Sample Detail</WhiteText>
                  </TableCell>
                  <TableCell>
                    {!isEditing ? (
                      <WhiteText align="center">
                        {sample.sampleDetail || "Not Provided"}
                      </WhiteText>
                    ) : (
                      <WhiteTextField
                        label="Sample Detail"
                        defaultValue={sample.sampleDetail || ""}
                        onChange={(e) =>
                          handleChange("sampleDetail", e.target.value)
                        }
                      />
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <WhiteText align="center">Requested By</WhiteText>
                  </TableCell>
                  <TableCell>
                    {!isEditing ? (
                      <WhiteText align="center">
                        {sample.requestedBy || "Not Provided"}
                      </WhiteText>
                    ) : (
                      <WhiteTextField
                        label="Requested By"
                        defaultValue={sample.requestedBy || ""}
                        onChange={(e) =>
                          handleChange("requestedBy", e.target.value)
                        }
                      />
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <WhiteText align="center">
                      Sample Condition/Quantity
                    </WhiteText>
                  </TableCell>
                  <TableCell>
                    <WhiteText align="center">
                      {!isEditing ? (
                        <WhiteText align="center">
                          {sample.sampleCondOrQty || "Not Provided"}
                        </WhiteText>
                      ) : (
                        <WhiteTextField
                          label="Sample Condition/Quantity"
                          defaultValue={sample.sampleCondOrQty || ""}
                          onChange={(e) =>
                            handleChange("sampleCondOrQty", e.target.value)
                          }
                        />
                      )}
                    </WhiteText>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <WhiteText align="center">Sampling By</WhiteText>
                  </TableCell>
                  <TableCell>
                    <WhiteText align="center">
                      {!isEditing ? (
                        <WhiteText align="center">
                          {sample.samplingBy || "Not Provided"}
                        </WhiteText>
                      ) : (
                        <WhiteTextField
                          label="Sampling By"
                          defaultValue={sample.samplingBy || ""}
                          onChange={(e) =>
                            handleChange("samplingBy", e.target.value)
                          }
                        />
                      )}
                    </WhiteText>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <WhiteText align="center">
                      Name of Farmer/Customer
                    </WhiteText>
                  </TableCell>
                  <TableCell>
                    <WhiteText align="center">
                      {!isEditing ? (
                        <WhiteText align="center">
                          {sample.name || "Not Provided"}
                        </WhiteText>
                      ) : (
                        <WhiteTextField
                          label="Name of Farmer/Customer"
                          defaultValue={sample.name || ""}
                          onChange={(e) => handleChange("name", e.target.value)}
                        />
                      )}
                    </WhiteText>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <WhiteText align="center">Address</WhiteText>
                  </TableCell>
                  <TableCell>
                    <WhiteText align="center">
                      {!isEditing ? (
                        <WhiteText align="center">
                          {sample.address || "Not Provided"}
                        </WhiteText>
                      ) : (
                        <WhiteTextField
                          label="Address"
                          defaultValue={sample.address || ""}
                          onChange={(e) =>
                            handleChange("address", e.target.value)
                          }
                        />
                      )}
                    </WhiteText>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <WhiteText align="center">Contact Number</WhiteText>
                  </TableCell>
                  <TableCell>
                    <WhiteText align="center">
                      {!isEditing ? (
                        <WhiteText align="center">
                          {sample.contactNo || "Not Provided"}
                        </WhiteText>
                      ) : (
                        <WhiteTextField
                          label="Contact Number"
                          defaultValue={sample.contactNo || ""}
                          onChange={(e) =>
                            handleChange("contactNo", e.target.value)
                          }
                        />
                      )}
                    </WhiteText>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <WhiteText align="center">Farm Name</WhiteText>
                  </TableCell>
                  <TableCell>
                    <WhiteText align="center">
                      {!isEditing ? (
                        <WhiteText align="center">
                          {sample.farmName || "Not Provided"}
                        </WhiteText>
                      ) : (
                        <WhiteTextField
                          label="Farm Name"
                          defaultValue={sample.farmName || ""}
                          onChange={(e) =>
                            handleChange("farmName", e.target.value)
                          }
                        />
                      )}
                    </WhiteText>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <WhiteText align="center">Survey Number</WhiteText>
                  </TableCell>
                  <TableCell>
                    <WhiteText align="center">
                      {!isEditing ? (
                        <WhiteText align="center">
                          {sample.surveyNo || "Not Provided"}
                        </WhiteText>
                      ) : (
                        <WhiteTextField
                          label="Survey Number"
                          defaultValue={sample.surveyNo || ""}
                          onChange={(e) =>
                            handleChange("surveyNo", e.target.value)
                          }
                        />
                      )}
                    </WhiteText>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <WhiteText align="center">Previous Crop</WhiteText>
                  </TableCell>
                  <TableCell>
                    <WhiteText align="center">
                      {!isEditing ? (
                        <WhiteText align="center">
                          {sample.prevCrop || "Not Provided"}
                        </WhiteText>
                      ) : (
                        <WhiteTextField
                          label="Previous Crop"
                          defaultValue={sample.prevCrop || ""}
                          onChange={(e) =>
                            handleChange("prevCrop", e.target.value)
                          }
                        />
                      )}
                    </WhiteText>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <WhiteText align="center">Next Crop</WhiteText>
                  </TableCell>
                  <TableCell>
                    <WhiteText align="center">
                      {!isEditing ? (
                        <WhiteText align="center">
                          {sample.nextCrop || "Not Provided"}
                        </WhiteText>
                      ) : (
                        <WhiteTextField
                          label="Next Crop"
                          defaultValue={sample.nextCrop || ""}
                          onChange={(e) =>
                            handleChange("nextCrop", e.target.value)
                          }
                        />
                      )}
                    </WhiteText>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item lg={6} md={12} sm={12} xs={12}>
          <WhiteText variant="h6" align="center">
            Report Details
          </WhiteText>
          <WhiteText fontSize={18}>Sample Code: {sample.sampleCode}</WhiteText>
          <WhiteText fontSize={18}>
            Analysis Set: {analysisSet}, (
            {Object.keys(report.testResults).length} parameters)
          </WhiteText>
          <WhiteText fontSize={18}>ULR: {report.ulr}</WhiteText>
          <TableContainer
            component={Box}
            style={{
              height: "38.5vh",
              overflowY: "auto",
              width: "100%",
              overflowX: "hidden",
            }}
          >
            <Table>
              <TableBody>
                {parameters
                  .filter((param) =>
                    Object.hasOwn(report.testResults, param.paramId)
                  )
                  .map((param) => (
                    <TableRow key={param.paramId}>
                      <TableCell>
                        <WhiteText align="center">{param.paramName}</WhiteText>
                      </TableCell>
                      <TableCell>
                        <WhiteText align="center">
                          {report.testResults[param.paramId]}
                        </WhiteText>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <Box
        style={{
          display: "flex",
          gap: "30px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {updated ? (
          <Alert severity="success">
            <Typography>Updated</Typography>
          </Alert>
        ) : errorInUpdate ? (
          <Alert severity="error">
            <Typography>Error in updating: {errorInUpdate}</Typography>
          </Alert>
        ) : null}
        {!isEditing ? (
          <CustomButton
            text="Edit Details"
            color="white"
            borderColor="white"
            hoverBackground="rgba(255,255,255,0.3)"
            hoverborderColor="white"
            onClick={() => setIsEditing(true)}
          />
        ) : (
          <>
            <CustomButton
              text="Cancel"
              color="white"
              background="red"
              borderColor="white"
              hoverColor="red"
              hoverBackground="none"
              hoverborderColor="red"
              onClick={() => setIsEditing(false)}
            />
            <CustomButton
              text="Update Details"
              color="white"
              background="green"
              borderColor="white"
              hoverColor="green"
              hoverBackground="none"
              hoverborderColor="green"
              onClick={handleSubmit}
            />
          </>
        )}
        <GeneratePDFComponent
          sampleCode={sampleCode}
          analysisSet={analysisSet}
        />
      </Box>
    </OpenAuthorisedReportBox>
  );
};

export default OpenAuthorisedReport;
