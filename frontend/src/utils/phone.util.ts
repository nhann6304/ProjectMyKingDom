export const formatPhoneNumber = (phone: string | number = "") => {
    if (phone !== "") {
        let phoneStr = phone.toString().replace(/\D/g, ""); // Xóa ký tự không phải số

        if (phoneStr.startsWith("0")) {
            phoneStr = phoneStr.slice(1); // Bỏ số 0 đầu
        }
        return `+84${phoneStr}`;
    } else {
        return phone
    }
};