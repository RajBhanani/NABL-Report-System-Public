import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Grid,
  Typography,
  styled,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../../../components/stickers/CustomButton";
import WhiteTextField from "../../../../components/stickers/WhiteTextField";
import { useState } from "react";
import {
  useAuthoriseReportMutation,
  useUpdateReportMutation,
} from "../../../../redux/slices/api slices/nablApiSlice";
import { updateReportState } from "../../../../redux/slices/nablSlice";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const OpenUnauthorisedReportBox = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  alignItems: "center",
  gap: "10px",
});

const WhiteText = styled(Typography)({
  color: "white",
});

const OpenUnauthorisedReport = () => {
  const { sampleCode } = useParams();
  const [searchParams] = useSearchParams();
  const analysisSet = searchParams.get("analysisSet");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let { parameters, samples, reports } = useSelector((state) => state.nabl);

  const sample = samples.filter((sample) => sample.sampleCode == sampleCode)[0];
  samples = [];

  const report = reports.filter(
    (report) =>
      report.sampleCode === sampleCode && report.analysisSet === analysisSet
  )[0];
  reports = [];

  const { parameterSets } = parameters;

  parameters =
    report.sampleCode[2] === "S"
      ? parameters.soilParameters
      : parameters.waterParameters;

  const sampleSet = parameterSets.filter((set) => set.name === analysisSet)[0];

  const sampleParameters = sampleSet.parameters;

  const [isEditing, setIsEditing] = useState(false);

  const [updateReport] = useUpdateReportMutation();
  const [authoriseReport] = useAuthoriseReportMutation();

  const [reportData, setReportData] = useState(report.testResults);

  const handleVariableChange = (paramId, paramVariable, variableValue) => {
    setReportData({
      ...reportData,
      [paramId]: { ...reportData[paramId], [paramVariable]: variableValue },
    });
  };

  const handleTextChange = (paramId, paramValue) => {
    setReportData({
      ...reportData,
      [paramId]: paramValue,
    });
  };

  const handleUpdate = async () => {
    setIsEditing(false);
    const { testResults } = await updateReport({
      sampleCode: sample.sampleCode,
      analysisSet: analysisSet,
      reportData: reportData,
    }).unwrap();
    dispatch(
      updateReportState({
        sampleCode: report.sampleCode,
        analysisSet: analysisSet,
        field: "testResults",
        value: testResults,
      })
    );
  };

  const [authorised, setAuthorised] = useState(null);
  const [errorInAuthorisation, setErrorInAuthorisation] = useState(null);

  const handleAuthorise = async () => {
    try {
      await authoriseReport({
        sampleCode: report.sampleCode,
        analysisSet: analysisSet,
      }).unwrap();
      dispatch(
        updateReportState({
          sampleCode: report.sampleCode,
          analysisSet: report.analysisSet,
          field: "isAuthorised",
          value: true,
        })
      );
      setAuthorised("Authorised");
    } catch (error) {
      setErrorInAuthorisation(error?.data?.message || error?.error);
    }
  };

  const { role } = useSelector((state) => state.auth).userInfo;

  return (
    <OpenUnauthorisedReportBox>
      {!report.isAuthorised ? (
        <>
          <Box
            style={{
              width: "50%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <WhiteText variant="h6">Sample Code: {report.sampleCode}</WhiteText>
            <WhiteText variant="h6">ULR: {report.ulr}</WhiteText>
          </Box>
          <Box
            style={{
              overflowY: "auto",
              width: "50%",
            }}
          >
            <WhiteText variant="h6" align="center">
              Analysis Result
            </WhiteText>
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                padding: "20px 20px",
              }}
            >
              {parameters
                .filter((param) => sampleParameters.includes(param.paramId))
                .map((param) => (
                  <Accordion
                    key={param.paramId}
                    style={{
                      background: "transparent",
                      width: "100%",
                      color: isEditing ? "white" : null,
                    }}
                  >
                    <AccordionSummary
                      expandIcon={
                        isEditing && (
                          <ExpandMoreIcon
                            fontSize="medium"
                            style={{ color: "white" }}
                          />
                        )
                      }
                    >
                      <Typography fontSize="18px">
                        {param.paramName} ={" "}
                        {report.testResults[param.paramId] || "Not Provided"}
                      </Typography>
                    </AccordionSummary>
                    {isEditing && (
                      <AccordionDetails>
                        {param.paramVariables.length != 0 ? (
                          <Grid container>
                            {param.paramVariables.map((variable) => (
                              <Grid
                                item
                                key={variable}
                                lg={6}
                                md={6}
                                sm={12}
                                xs={12}
                              >
                                <WhiteTextField
                                  width="90%"
                                  label={variable}
                                  onChange={(e) =>
                                    handleVariableChange(
                                      param.paramId,
                                      variable,
                                      e.target.value
                                    )
                                  }
                                />
                              </Grid>
                            ))}
                          </Grid>
                        ) : (
                          <WhiteTextField
                            label={param.paramName}
                            onChange={(e) =>
                              handleTextChange(param.paramId, e.target.value)
                            }
                          />
                        )}
                      </AccordionDetails>
                    )}
                  </Accordion>
                ))}
            </Box>
          </Box>
          {
            <Box style={{ display: "flex", gap: "40px" }}>
              {isEditing ? (
                <>
                  <CustomButton
                    text="Cancel"
                    width="100px"
                    color="white"
                    background="red"
                    borderColor="white"
                    hoverColor="red"
                    hoverBackground="none"
                    hoverborderColor="red"
                    onClick={() => {
                      setIsEditing(false);
                    }}
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
                    onClick={handleUpdate}
                  />
                </>
              ) : (
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                  }}
                >
                  {authorised && <Alert severity="success">{authorised}</Alert>}
                  {errorInAuthorisation && (
                    <Alert severity="error">{errorInAuthorisation}</Alert>
                  )}
                  <Box
                    style={{
                      display: "flex",
                      gap: "20px",
                      justifyContent: "center",
                    }}
                  >
                    <CustomButton
                      text="Edit"
                      width="100px"
                      color="white"
                      borderColor="white"
                      hoverBackground="rgba(255,255,255,0.3)"
                      hoverborderColor="white"
                      onClick={() => setIsEditing(true)}
                    />
                    {(role === "admin" || role === "superadmin") && (
                      <CustomButton
                        text="Authorise"
                        width="100px"
                        color="white"
                        background="darkblue"
                        borderColor="white"
                        hoverColor="darkblue"
                        hoverBackground="none"
                        hoverborderColor="darkblue"
                        onClick={handleAuthorise}
                      />
                    )}
                  </Box>
                </Box>
              )}
            </Box>
          }
        </>
      ) : (
        <>
          <WhiteText variant="h5">
            Report Authorised, click here to see the final Report
          </WhiteText>
          <CustomButton
            text="Final Report"
            color="white"
            borderColor="white"
            hoverBackground="rgba(255,255,255,0.3)"
            hoverborderColor="white"
            onClick={() =>
              navigate(
                `../authorised/${report.sampleCode}?analysisSet=${report.analysisSet}`
              )
            }
          />
        </>
      )}
    </OpenUnauthorisedReportBox>
  );
};

export default OpenUnauthorisedReport;
