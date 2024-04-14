import { apiSlice } from "./apiSlice";

const ADMIN_URL = "https://nabl-report-system-public.onrender.com/api/admin";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    verifyAdmin: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/verify`,
        method: "GET",
        credentials: 'include',
      }),
    }),
  }),
});

export const { useVerifyAdminMutation } = adminApiSlice;
