export const CONST_APIS = {
    VERSION_V1: "http://localhost:9000/api/v1",

    FEATURES: {
        AUTH: {
            LOGIN: "login",
            REGISTER: "register",
            SEND_OTP: "send-otp",
            VERIFY_OTP: "verify-otp",
            LOGOUT: "log-out",
            RESET_PASSWORD: "reset-password",
        },

        COMMON: {
            AUTH: "auth",
            PRODUCTS: "products",
            CARTS: "carts",
            COMPANIES: "companies",
            PRODUCTS_CATEGORIES: "product-categories"
        }
    },
}


export const CONST_API_COMMON = {
    FIND_ALL: "find-all",
    UPDATE: "update",
    DELETE: "delete",
    CREATE: "create",
    ADD: "add",
    FIND_PRODUCT_SLUG_CATE: "find-product-by-slug-cate"
}