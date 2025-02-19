export const API_URL = {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    CREATE_STORE: "/store/create",
    GET_STORE_BY_USER: (id: string) => `/store/list/${id}`,
    CREATE_PRODUCT: "/product/create",
    GET_ALL_PRODUCT_BY_STORE: (storeId: string) => `/product/${storeId}`,
    GET_ALL_CATEGORY: "/get-all/category",
    GET_SINGLE_PRODUCT: (productId: string) => `/product/${productId}/get-single`,
    UPDATE_PRODUCT: (productId: string) => `/product/${productId}`,
    DELETE_PRODUCT: (productId: string) => `/product/${productId}`,
    GET_HOME_DATA: "/get-data/home",
    VERIFY_TOKEN: (token: string) => `/verify/token/${token}`,
}

export const ROUTES = {
    LOGIN: "/login",
    REGISTER: "/register",
    HOME: "/",
    DASHBOARD_STORE: (slug: string) => `/store/${slug}`,
    PRODUCT_SELLER: (slug: string) =>  `/store/${slug}/product`,
    CREATE_PRODUCT_SELLER: (slug: string) =>  `/store/${slug}/product/create`,
    EDIT_PRODUCT_SELLER: (slug: string, productSlug: string) =>  `/store/${slug}/product/${productSlug}/edit`,
}