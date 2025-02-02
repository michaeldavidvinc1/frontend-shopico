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
        getAllProductByStore: builder.query({
            query: (storeId: string) => ({
                url: API_URL.GET_ALL_PRODUCT_BY_STORE(storeId),
               method: "GET",
            })
        })
    })
});

export const {useCreateProductMutation, useGetAllProductByStoreQuery} = productApi