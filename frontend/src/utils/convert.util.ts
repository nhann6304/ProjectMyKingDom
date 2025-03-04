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

export const convertPriceToString = (value?: string): string => {
    if (!value) return "0 Đ"; // Kiểm tra undefined hoặc chuỗi rỗng

    let number = Number(value);
    if (isNaN(number)) return "0 Đ"; // Kiểm tra nếu không phải số

    number = Math.round(number / 1000) * 1000;

    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        minimumFractionDigits: 0,
    }).format(number);
};

export const convertDiscount = (discount: number): number => {
    return discount % 1 === 0 ? Math.floor(discount) : Math.ceil(discount);
};




