import { API_URL } from "@/constant";
import {apiSlice} from "@/services/base-query";

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
               url: API_URL.LOGIN,
               method: "POST",
               body: credentials,
            })
        }),
        register: builder.mutation({
            query: (credentials) => ({
                url: API_URL.REGISTER,
                method: "POST",
                body: credentials,
                extraOptions: { isPublic: true },
            })
        })
    })
});

export const {useLoginMutation, useRegisterMutation} = authApi