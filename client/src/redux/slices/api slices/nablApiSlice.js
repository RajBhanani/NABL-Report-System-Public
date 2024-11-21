import { apiSlice } from "./apiSlice";

const NABL_URL = "https://nabl-report-system-public.onrender.com/api/nabl";

export const nablApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSample: builder.mutation({
      query: (data) => ({
        url: `${NABL_URL}/createSample`,
        method: "POST",
        body: data,
        credentials: 'include',
      }),
    }),
    getSamples: builder.mutation({
      query: () => ({
        url: `${NABL_URL}/getSamples`,
        method: "GET",
        credentials: 'include',
      }),
    }),
    updateSample: builder.mutation({
      query: (data) => ({
        url: `${NABL_URL}/updateSample`,
        method: "PUT",
        body: data,
        credentials: 'include',
      }),
    }),
    createReport: builder.mutation({
      query: (data) => ({
        url: `${NABL_URL}/createReport`,
        method: "POST",
        body: data,
        credentials: 'include',
      }),
    }),
    getReports: builder.mutation({
      query: () => ({
        url: `${NABL_URL}/getReports`,
        method: "GET",
        credentials: 'include',
      }),
    }),
    updateReport: builder.mutation({
      query: (data) => ({
        url: `${NABL_URL}/updateReport`,
        method: "PUT",
        body: data,
        credentials: 'include',
      }),
    }),
    authoriseReport: builder.mutation({
      query: (data) => ({
        url: `${NABL_URL}/authoriseReport`,
        method: "PUT",
        body: data,
        credentials: 'include',
      }),
    }),
    getNablData: builder.mutation({
      query: () => ({
        url: `${NABL_URL}/getNablData`,
        method: "GET",
        credentials: 'include',
      }),
    }),
    updateNablData: builder.mutation({
      query: (data) => ({
        url: `${NABL_URL}/updateNablData`,
        method: "PUT",
        body: data,
        credentials: 'include',
      }),
    }),
    createParam: builder.mutation({
      query: (data) => ({
        url: `${NABL_URL}/createParam`,
        method: "POST",
        body: data,
        credentials: 'include',
      }),
    }),
    getParams: builder.mutation({
      query: () => ({
        url: `${NABL_URL}/getParams`,
        method: "GET",
        credentials: 'include',
      }),
    }),
    updateParam: builder.mutation({
      query: (data) => ({
        url: `${NABL_URL}/updateParam`,
        method: "PUT",
        body: data,
        credentials: 'include',
      }),
    }),
    createParamSet: builder.mutation({
      query: (data) => ({
        url: `${NABL_URL}/createParamSet`,
        method: "POST",
        body: data,
        credentials: 'include',
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
