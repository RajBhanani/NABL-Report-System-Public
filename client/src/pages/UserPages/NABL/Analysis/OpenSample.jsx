import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Typography,
  styled,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CustomButton from "../../../../components/stickers/CustomButton";
import WhiteTextField from "../../../../components/stickers/WhiteTextField";
import WhiteDatePicker from "../../../../components/stickers/WhiteDatePicker";
import {
  addReport,
  updateSampleState,
} from "../../../../redux/slices/nablSlice";
import { useCreateReportMutation } from "../../../../redux/slices/api slices/nablApiSlice";
import { useNavigate, useParams } from "react-router-dom";

const GridBox = styled(Box)({
  display: "flex",
  height: "60vh",
  flexDirection: "column",
  gap: "1.5vh",
  padding: "20px",
  backgroundColor: "rgba(255, 255, 255, 0.3)",
});

const WhiteText = styled(Typography)({
  color: "white",
});

const OpenSample = () => {
  const { sampleCode } = useParams();
  const navigate = useNavigate();

  const [analysisStartedOn, setAnalysisStartedOn] = useState("");
  const [analysisEndedOn, setAnalysisEndedOn] = useState("");

  const dispatch = useDispatch();

  let { parameters, samples } = useSelector((state) => state.nabl);

  const sample = samples.filter((sample) => sample.sampleCode == sampleCode)[0];
  samples = [];

  const { parameterSets } = parameters;

  parameters =
    sample.sampleType === "soil"
      ? parameters.soilParameters
      : parameters.waterParameters;

  const remainingSets = sample.analysisSet
    .filter((set) => !set.isReported)
    .map((set) => set.name);

  const sampleSet = parameterSets.filter((set) =>
    remainingSets.includes(set.name)
  );

  const [createReport] = useCreateReportMutation();

  const [reportData, setReportData] = useState({});

  const handleVariableChange = (set, paramId, paramVariable, variableValue) => {
    setReportData({
      ...reportData,
      [set]: {
        ...reportData[set],
        [paramId]: {
          ...reportData[set]?.[paramId],
          [paramVariable]: variableValue,
        },
      },
    });
  };

  const handleTextChange = (set, paramId, paramValue) => {
    setReportData({
      ...reportData,
      [set]: {
        ...reportData[set],
        [paramId]: paramValue,
      },
    });
  };

  const [created, setCreated] = useState();
  const [errorInCreation, setErrorInCreation] = useState();
  const [redirectMessage, setRedirectMessage] = useState();

  const handleSubmit = async () => {
    try {
      const { sampleCode } = sample;
      const { reports, analysisSet, isSampleReported } = await createReport({
        sampleCode,
        reportData,
        analysisStartedOn,
        analysisEndedOn,
      }).unwrap();
      dispatch(
        updateSampleState({
          sampleCode: sampleCode,
          field: "analysisSet",
          value: analysisSet,
        })
      );
      setReportData({});
      reports.forEach((report) => {
        dispatch(addReport(report));
      });
      if (isSampleReported) {
        dispatch(
          updateSampleState({
            sampleCode: sampleCode,
            field: "isReported",
            value: true,
          })
        );
        setRedirectMessage(true);
        setTimeout(() => {
          navigate("/nabl/analysis");
        }, 3000);
      }
      setCreated(reports);
      setErrorInCreation(null);
    } catch (error) {
      setErrorInCreation(error?.data?.message || error.error);
      setCreated(null);
    }
  };

  return (
    <Grid container>
      <Grid item lg={5} md={12} sm={12} xs={12}>
        <GridBox>
          <WhiteText variant="h5" align="center">
            Analysis Details
          </WhiteText>
          <FormControl style={{ marginTop: "10px" }}>
            <FormLabel>
              <WhiteText variant="h6" marginBottom="10px">
                Sample Code: {sample.sampleCode}
              </WhiteText>
            </FormLabel>
            <FormGroup style={{ display: "flex", gap: "20px" }}>
              <FormControlLabel
                sx={{ width: "100%", justifyContent: "space-between" }}
                control={
                  <WhiteDatePicker
                    label="Analysis Started On"
                    onChange={(newValue) => setAnalysisStartedOn(newValue.$d)}
                  />
                }
                label={<WhiteText variant="h6">Analysis started on</WhiteText>}
                labelPlacement="start"
              />
              <FormControlLabel
                sx={{ width: "100%", justifyContent: "space-between" }}
                control={
                  <WhiteDatePicker
                    label="Analysis Ended On"
                    onChange={(newValue) => setAnalysisEndedOn(newValue.$d)}
                  />
                }
                label={<WhiteText variant="h6">Analysis ended on</WhiteText>}
                labelPlacement="start"
              />
            </FormGroup>
          </FormControl>
        </GridBox>
      </Grid>
      <Grid item lg={7} md={12} sm={12} xs={12}>
        <GridBox>
          <WhiteText variant="h5" textAlign="center">
            Parameters
          </WhiteText>
          <Box
            style={{
              overflowY: "scroll",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              padding: "20px 20px",
              alignItems: "center",
            }}
          >
            {sampleSet.map((set) => (
              <Accordion
                key={set.name}
                style={{ background: "transparent", width: "100%" }}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon
                      fontSize="medium"
                      style={{ color: "white" }}
                    />
                  }
                >
                  <WhiteText variant="h6">{set.name}</WhiteText>
                </AccordionSummary>
                <AccordionDetails
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                  }}
                >
                  {parameters
                    .filter((param) => set.parameters.includes(param.paramId))
                    .map((param) => (
                      <Accordion
                        key={param.paramId}
                        style={{ background: "transparent", width: "100%" }}
                      >
                        <AccordionSummary
                          expandIcon={
                            <ExpandMoreIcon
                              fontSize="medium"
                              style={{ color: "white" }}
                            />
                          }
                        >
                          <WhiteText variant="h6">{param.paramName}</WhiteText>
                        </AccordionSummary>
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
                                        set.name,
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
                                handleTextChange(
                                  set.name,
                                  param.paramId,
                                  e.target.value
                                )
                              }
                            />
                          )}
                        </AccordionDetails>
                      </Accordion>
                    ))}
                </AccordionDetails>
              </Accordion>
            ))}
            {created ? (
              created.map((report) => (
                <Alert severity="success" key={report._id}>
                  <Typography>
                    The results for {report.analysisSet} are as follows:
                  </Typography>
                  {Object.keys(report.testResults).map((id) => {
                    const parameter = parameters.filter(
                      (param) => param.paramId === Number(id)
                    )[0];
                    return (
                      <Box key={parameter.paramId}>
                        <Typography>
                          {parameter.paramName}: {report.testResults[id]}
                        </Typography>
                      </Box>
                    );
                  })}
                  {redirectMessage ? (
                    <Typography variant="h6">Redirecting soon...</Typography>
                  ) : null}
                </Alert>
              ))
            ) : errorInCreation ? (
              <Alert severity="error">
                Error in creation {errorInCreation}
              </Alert>
            ) : null}
            <CustomButton
              text="Submit"
              color="white"
              background="green"
              borderColor="white"
              hoverColor="green"
              hoverBackground="none"
              hoverborderColor="green"
              width="30%"
              onClick={handleSubmit}
            />
          </Box>
        </GridBox>
      </Grid>
    </Grid>
  );
};

export default OpenSample;
