import { API_URL } from "@/constant";
import {apiSlice} from "@/services/base-query";

export const productApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createProduct: builder.mutation({
            query: (credentials) => ({
               url: API_URL.CREATE_PRODUCT,
               method: "POST",
               body: credentials
            })
        }),
    })
});

export const {useCreateProductMutation} = productApi