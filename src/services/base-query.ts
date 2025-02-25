import {BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from '@reduxjs/toolkit/query'
import {createApi} from '@reduxjs/toolkit/query/react'
import {getSession, signOut} from "next-auth/react";

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: async(headers) => {
        const session = await getSession();
        if(session?.user.token){
            headers.set('Authorization', `Bearer ${session.user.token}`);
        }
        headers.set('Accept', 'application/json')
        return headers;
    }
});

const baseQueryWithAuthHandling: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    
    // Cek jika error 401 (Unauthorized)
    if (result.error?.status === 401) {
        const session = await getSession();
        
        // Jika ada session, lakukan sign out
        if (session) {
            await signOut({ redirect: false });
        }
        
        // Redirect ke halaman login
        window.location.href = '/login';
    }
    
    return result;
};

export const apiSlice = createApi({
    baseQuery: baseQueryWithAuthHandling, // Gunakan baseQuery yang sudah dimodifikasi
    tagTypes: ['Product'],
    endpoints: () => ({})
});