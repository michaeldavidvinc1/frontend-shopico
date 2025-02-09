import { API_URL } from "@/constant";
import { UpdateProductInterface } from "@/interface/product";
import {apiSlice} from "@/services/base-query";

export const productApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createProduct: builder.mutation({
            query: (payload) => ({
               url: API_URL.CREATE_PRODUCT,
               method: "POST",
               body: payload
            }),
        }),
        getAllProductByStore: builder.query({
            query: (storeId: string) => ({
                url: API_URL.GET_ALL_PRODUCT_BY_STORE(storeId),
               method: "GET",
            }),
        }),
        getSingleProduct: builder.query({
            query: (productId: string) => ({
                url: API_URL.GET_SINGLE_PRODUCT(productId),
                method: "GET",
            })
        }),
        updateProduct: builder.mutation({
            query: ({payload, productId} : { payload: FormData; productId: string }) => ({
                url: API_URL.UPDATE_PRODUCT(productId),
                method: "PUT",
                body: payload
             }),
        })
    })
});

export const {useCreateProductMutation, useGetAllProductByStoreQuery, useGetSingleProductQuery, useUpdateProductMutation} = productApi