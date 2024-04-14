import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  parameters: {},
  samples: [],
  reports: [],
};

const nablSlice = createSlice({
  name: "nabl",
  initialState,
  reducers: {
    setParameters: (state, action) => {
      state.parameters = action.payload;
    },
    emptyParameters: (state) => {
      state.parameters = [];
    },
    addSample: (state, action) => {
      if (
        state.samples.findIndex(
          (sample) => sample.sampleCode === action.payload.sampleCode
        ) === -1
      )
        state.samples.push(action.payload);
    },
    deleteSample: (state, action) => {
      state.samples = state.samples.filter(
        (sample) => sample.sampleCode === action.payload.sampleCode
      );
    },
    updateSampleState: (state, action) => {
      const sampleIndex = state.samples.findIndex(
        (sample) => sample.sampleCode === action.payload.sampleCode
      );
      if (sampleIndex !== -1)
        state.samples[sampleIndex][action.payload.field] = action.payload.value;
    },
    emptySamples: (state) => {
      state.samples = [];
    },
    addReport: (state, action) => {
      if (
        state.reports.findIndex(
          (report) =>
            report.sampleCode === action.payload.sampleCode &&
            report.analysisSet === action.payload.analysisSet
        ) === -1
      )
        state.reports.push(action.payload);
    },
    updateReportState: (state, action) => {
      const reportIndex = state.reports.findIndex(
        (report) =>
          report.sampleCode === action.payload.sampleCode &&
          report.analysisSet === action.payload.analysisSet
      );
      if (reportIndex !== -1)
        state.reports[reportIndex][action.payload.field] = action.payload.value;
    },
    emptyReports: (state) => {
      state.reports = [];
    },
  },
});

export const {
  setParameters,
  emptyParameters,
  addSample,
  deleteSample,
  updateSampleState,
  emptySamples,
  addReport,
  updateReportState,
  emptyReports,
} = nablSlice.actions;

export default nablSlice.reducer;
