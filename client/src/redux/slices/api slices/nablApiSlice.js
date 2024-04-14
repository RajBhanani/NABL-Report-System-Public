import { apiSlice } from "./apiSlice";

const NABL_URL = "https://nabl-report-system-public.onrender.com/api/nabl";

export const nablApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSample: builder.mutation({
      query: (data) => ({
        url: `${NABL_URL}/createSample`,
        method: "POST",
        body: data,
      }),
    }),
    getSamples: builder.mutation({
      query: () => ({
        url: `${NABL_URL}/getSamples`,
        method: "GET",
      }),
    }),
    updateSample: builder.mutation({
      query: (data) => ({
        url: `${NABL_URL}/updateSample`,
        method: "PUT",
        body: data,
      }),
    }),
    createReport: builder.mutation({
      query: (data) => ({
        url: `${NABL_URL}/createReport`,
        method: "POST",
        body: data,
      }),
    }),
    getReports: builder.mutation({
      query: () => ({
        url: `${NABL_URL}/getReports`,
        method: "GET",
      }),
    }),
    updateReport: builder.mutation({
      query: (data) => ({
        url: `${NABL_URL}/updateReport`,
        method: "PUT",
        body: data,
      }),
    }),
    authoriseReport: builder.mutation({
      query: (data) => ({
        url: `${NABL_URL}/authoriseReport`,
        method: "PUT",
        body: data,
      }),
    }),
    getNablData: builder.mutation({
      query: () => ({
        url: `${NABL_URL}/getNablData`,
        method: "GET",
      }),
    }),
    updateNablData: builder.mutation({
      query: (data) => ({
        url: `${NABL_URL}/updateNablData`,
        method: "PUT",
        body: data,
      }),
    }),
    createParam: builder.mutation({
      query: (data) => ({
        url: `${NABL_URL}/createParam`,
        method: "POST",
        body: data,
      }),
    }),
    getParams: builder.mutation({
      query: () => ({
        url: `${NABL_URL}/getParams`,
        method: "GET",
      }),
    }),
    updateParam: builder.mutation({
      query: (data) => ({
        url: `${NABL_URL}/updateParam`,
        method: "PUT",
        body: data,
      }),
    }),
    createParamSet: builder.mutation({
      query: (data) => ({
        url: `${NABL_URL}/createParamSet`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateSampleMutation,
  useGetSamplesMutation,
  useUpdateSampleMutation,
  useCreateReportMutation,
  useGetReportsMutation,
  useUpdateReportMutation,
  useAuthoriseReportMutation,
  useGetNablDataMutation,
  useUpdateNablDataMutation,
  useCreateParamMutation,
  useUpdateParamMutation,
  useGetParamsMutation,
  useCreateParamSetMutation,
} = nablApiSlice;
