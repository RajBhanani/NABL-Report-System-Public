import PropTypes from "prop-types";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";

import * as pdfMake from "pdfmake/build/pdfmake";
import CustomButton from "../../../../components/stickers/CustomButton";

import { companyLogo, nablLogo } from "../../../../constants/images";
import { useGetNablDataMutation } from "../../../../redux/slices/api slices/nablApiSlice";
import { useState } from "react";

const pdfFonts = {
  Roboto: {
    normal:
      "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/fonts/Roboto/Roboto-Regular.ttf",
    bold: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/fonts/Roboto/Roboto-Medium.ttf",
    italics:
      "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/fonts/Roboto/Roboto-Italic.ttf",
    bolditalics:
      "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/fonts/Roboto/Roboto-MediumItalic.ttf",
  },
};

const headerColumn = (analysisSet, currentCertificationNumber) => {
  let columns = [];
  const leftMargin = analysisSet !== "F/RPT/1.1" ? 40 : 130;
  const rightMargin = analysisSet !== "F/RPT/1.1" ? 5 : 0;
  columns.push({
    image: "companyLogo",
    width: 130,
    margin: [0, 30, 0, 0],
  });
  columns.push({
    text: [
      {
        text: "Soil Health Research Laboratory (SHRL)\n",
        style: "bold",
      },
      {
        text: "(A Division of Sumitomo Chemical India Limited)\n",
        style: "bold",
      },
      "6/2 Ruvapari Road, Bhavnagar - 364005\n",
      "Phone No. (0278) 2212401 - 3",
    ],
    alignment: "center",
    lineHeight: "1.3",
    margin: [rightMargin, 10, leftMargin, 0],
    fontSize: 10.5,
    width: analysisSet !== "F/RPT/1.1" ? 290 : "*",
  });
  if (analysisSet !== "F/RPT/1.1") {
    columns.push([
      {
        image: "nablLogo",
        width: 60,
      },
      { text: `TC-${currentCertificationNumber}`, margin: [10, 10, 0, 0] },
    ]);
  }
  return { columns: columns };
};

const buildTable = (testResults, parameters) => {
  let body = [];
  body.push(["Sr.No.", "Parameter", "Unit", "Result", "Test Method"]);
  for (let i = 0; i < parameters.length; i++) {
    let sameTestCount = 0;
    let temp = i;
    while (
      temp + 1 < parameters.length &&
      parameters[temp].paramTestMethod === parameters[temp + 1].paramTestMethod
    ) {
      sameTestCount++;
      temp++;
    }
    body.push([
      Number(i + 1),
      parameters[i].paramName,
      parameters[i].paramUnit,
      testResults[parameters[i].paramId],
      { text: parameters[i].paramTestMethod, rowSpan: sameTestCount + 1 },
    ]);
    for (let k = 0; k < sameTestCount; k++) {
      body.push([
        Number(i + k + 2),
        parameters[i + k + 1].paramName,
        parameters[i + k + 1].paramUnit,
        testResults[parameters[i + k + 1].paramId],
        "",
      ]);
    }
    i += sameTestCount;
  }
  return body;
};

const table = (testResults, parameters) => {
  return {
    table: {
      widths: [30, 100, 50, 75, "*"],
      body: buildTable(testResults, parameters),
    },
    style: "table2",
  };
};

const createDocDefination = (sample, report, parameters, nablData) => {
  const docDefination = {
    watermark: {text: "Demo sample, not real", opacity: 0.2},
    content: [
      headerColumn(report.analysisSet, nablData.currentCertificationNumber),
      { text: "TEST REPORT", style: ["bold", "center", "underline", "bigger"] },
      "",
      {
        table: {
          widths: ["*", "*", "*"],
          body: [
            [
              `Sample Code: ${sample.sampleCode}`,
              "",
              {
                text: `Report Date: ${new Date().toLocaleDateString()}`,
                style: "center",
              },
            ],
          ],
        },
        style: "table1",
      },
      { text: "Sample Detail", style: ["center", "big"] },
      {
        table: {
          widths: ["*", "*"],
          body: [
            [
              `Sample Receieved On: ${
                new Date(sample.sampleReceivedOn).toLocaleDateString() || "--"
              }`,
              `ULR: ${report.ulr}`,
            ],
            [
              `* Sample Type: ${sample.sampleType[0].toUpperCase()}${sample.sampleType.slice(
                1
              )}`,
              `* Name of Farmer/Customer: ${sample.name || "--"}`,
            ],
            [
              `* Sample Detail: ${sample.sampleDetail || "--"}`,
              `* Address: ${sample.address || "--"}`,
            ],
            [
              `* Parameter: ${Object.keys(report.testResults).length}`,
              `* Contact No.: ${sample.contactNo || "--"}`,
            ],
            [
              `* Requested by: ${sample.requestedBy || "--"}`,
              `* Farm Name: ${sample.farmName || "--"}`,
            ],
            [
              `Sample Condition/Qty.: ${sample.sampleCondOrQty || "--"}`,
              `* Survey No.: ${sample.surveyNo || "--"}`,
            ],
            [
              `Date(s) of Analysis: ${new Date(
                report.analysisStartedOn
              ).toLocaleDateString()} to ${new Date(
                report.analysisEndedOn
              ).toLocaleDateString()}`,
              `* Previous Crop: ${sample.prevCrop || "--"}`,
            ],
            [
              `Sampling By: ${sample.samplingBy || "--"}`,
              `* Next Crop: ${sample.nextCrop || "--"}`,
            ],
          ],
        },
      },
      table(report.testResults, parameters),
      {
        text: [
          { text: "Remarks: * ", bold: "true" },
          "information provided by customer",
        ],
      },
      {
        text: "Environmental Condition: Temperature 25° ± 2°C & Humidity 50 ± 20RH",
      },
      {
        columns: [
          {
            text: "Analysed By",
            style: "bold",
            margin: [0, 20, 0, 0],
          },
          {
            text: "Checked & Approved By",
            style: "sign",
            margin: [0, 20, 0, 0],
          },
        ],
      },
      {
        columns: [
          {
            text: `${nablData.analysedBy}`,
            style: "bold",
            margin: [0, 40, 0, 0],
          },
          {
            text: `${nablData.approvedBy}`,
            style: "sign",
            margin: [0, 40, 0, 0],
          },
        ],
      },
      {
        columns: [
          { text: "(Chemist)" },
          {
            text: "Quality Manager\n(Authorised Signatory)",
            width: "*",
            alignment: "center",
          },
        ],
      },
      {
        text: "This report is issued under the following terms and conditions:",
        style: "underline",
        margin: [0, 10, 0, 0],
      },
      {
        text: "1. The Test Results relates only for the sample received through the customer.",
        style: "TnC",
      },
      {
        text: "2. The Test Reports shall not be reproduced except in the full without written approval of laboratory.",
        style: "TnC",
      },
      {
        text: `3. Sample will be retained for a period of ${
          sample.sampleCode[2] === "S" ? "fifteen (15)" : "seven (7)"
        } days after completion of the analysis.`,
        margin: [0, 3, 0, 10],
      },
      {
        canvas: [
          {
            type: "line",
            x1: 0,
            x2: 515.35,
            y1: 0,
            y2: 0,
            dash: { length: 2 },
          },
        ],
      },
      {
        text: "End of Test Report",
        alignment: "center",
        margin: [0, 10, 0, 10],
      },
      {
        canvas: [
          {
            type: "line",
            x1: 0,
            x2: 515.35,
            y1: 0,
            y2: 0,
            dash: { length: 2 },
          },
        ],
      },
      {
        text: `${report.analysisSet}: ${nablData.currentRevision}`,
        margin: [0, 10, 0, 0],
      },
    ],

    images: {
      companyLogo: companyLogo,
      nablLogo: nablLogo,
    },

    styles: {
      bold: {
        bold: true,
      },
      center: {
        alignment: "center",
      },
      sty: {
        italics: true,
      },
      underline: {
        decoration: "underline",
      },
      big: {
        fontSize: 12,
      },
      bigger: {
        fontSize: 13,
      },
      table1: {
        margin: [0, 13, 0, 13],
      },
      table2: {
        alignment: "center",
        margin: [0, 15, 0, 15],
      },
      sign: {
        width: "*",
        bold: true,
        alignment: "center",
      },
      TnC: {
        margin: [0, 3, 0, 0],
      },
    },
    defaultStyle: {
      font: "Roboto",
      fontSize: 10,
    },
    pageSize: "A4",
  };
  return docDefination;
};

const GeneratePDFComponent = ({ sampleCode, analysisSet }) => {
  GeneratePDFComponent.propTypes = {
    sampleCode: PropTypes.string.isRequired,
    analysisSet: PropTypes.string.isRequired,
  };

  let { samples, parameters, reports } = useSelector((state) => state.nabl);
  const [getNablData] = useGetNablDataMutation();

  const [pdf, setPdf] = useState();

  const generateDocDefinition = async () => {
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

    parameters = parameters.filter((param) =>
      Object.hasOwn(report.testResults, param.paramId)
    );
    samples = [];
    reports = [];
    const { nablData } = await getNablData().unwrap();
    const docDefination = createDocDefination(
      sample,
      report,
      parameters,
      nablData
    );
    return {
      docDefination: docDefination,
      name: `${sample.sampleCode}_${report.analysisSet}`,
    };
  };

  const openPdf = async () => {
    const { docDefination } = await generateDocDefinition();
    pdfMake.createPdf(docDefination, null, pdfFonts).open();
  };

  const downloadPdf = async () => {
    const { docDefination, name } = await generateDocDefinition();
    pdfMake.createPdf(docDefination, null, pdfFonts).download(name);
  };

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <CustomButton
        text="Open PDF"
        color="white"
        borderColor="white"
        hoverBackground="rgba(255,255,255,0.3)"
        hoverborderColor="white"
        onClick={openPdf}
      />
      <CustomButton
        text="Download PDF"
        color="white"
        borderColor="white"
        hoverBackground="rgba(255,255,255,0.3)"
        hoverborderColor="white"
        onClick={downloadPdf}
      />
    </Box>
  );
};

export default GeneratePDFComponent;
