export const convertOjbToString = (obj: any): string => {
    let stringQuery = "?";

    for (const key in obj) {
        const val = obj[key];

        if (Array.isArray(val)) {
            val.forEach((item) => {
                stringQuery += `${key}=${encodeURIComponent(item)}&`;
            });
        } else {
            stringQuery += `${key}=${encodeURIComponent(val)}&`;
        }
    }

    return stringQuery.slice(0, -1); // Loại bỏ dấu '&' cuối cùng
};
