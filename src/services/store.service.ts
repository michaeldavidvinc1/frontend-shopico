import { API_URL } from "@/constant";
import {apiSlice} from "@/services/base-query";

export const storeApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createStore: builder.mutation({
            query: (credentials) => ({
               url: API_URL.CREATE_STORE,
               method: "POST",
               body: credentials
            })
        }),
    })
});

export const {useCreateStoreMutation} = storeApi