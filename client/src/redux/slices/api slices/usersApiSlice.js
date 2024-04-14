import { apiSlice } from "./apiSlice";

const USER_URL = "https://nabl-report-system-public.onrender.com/api/user";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/login`,
        method: "POST",
        body: data,
        credentials: 'include',
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/register`,
        method: "POST",
        body: data,
        credentials: 'include',
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USER_URL}/logout`,
        method: "POST",
        credentials: 'include',
      }),
    }),
    verifyUser: builder.mutation({
      query: () => ({
        url: `${USER_URL}/verify`,
        method: "GET",
        credentials: 'include',
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useVerifyUserMutation,
} = usersApiSlice;
