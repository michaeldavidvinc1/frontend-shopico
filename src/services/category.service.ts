import { API_URL } from "@/constant";
import {apiSlice} from "@/services/base-query";

export const categoryApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllCategory: builder.query({
            query: () => ({
                url: API_URL.GET_ALL_CATEGORY,
                method: "GET"
            })
        })
    })
});

export const {useGetAllCategoryQuery} = categoryApi