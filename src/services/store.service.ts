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
        getStoreByUser: builder.query({
            query: (id: string) => ({
                url: API_URL.GET_STORE_BY_USER(id),
                method: "GET"
            })
        })
    })
});

export const {useCreateStoreMutation, useGetStoreByUserQuery} = storeApi