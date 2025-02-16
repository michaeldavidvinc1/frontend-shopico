import { API_URL } from "@/constant";
import {apiSlice} from "@/services/base-query";

export const sellerApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDataHome: builder.query({
            query: () => ({
                url: API_URL.GET_HOME_DATA,
                method: "GET"
            })
        })
    })
});

export const {useGetDataHomeQuery} = sellerApi