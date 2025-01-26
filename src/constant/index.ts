export const API_URL = {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    CREATE_STORE: "/store/create"
}

export const ROUTES = {
    LOGIN: "/login",
    REGISTER: "/register",
    HOME: "/",
    DASHBOARD_STORE: (slug: string) => `/store/${slug}`
}