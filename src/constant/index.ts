export const API_URL = {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    CREATE_STORE: "/store/create",
    GET_STORE_BY_USER: (id: string) => `/store/list/${id}`
}

export const ROUTES = {
    LOGIN: "/login",
    REGISTER: "/register",
    HOME: "/",
    DASHBOARD_STORE: (slug: string) => `/store/${slug}`,
    PRODUCT_SELLER: (slug: string) =>  `/store/${slug}/product`,
    CREATE_PRODUCT_SELLER: (slug: string) =>  `/store/${slug}/product/create`,
}