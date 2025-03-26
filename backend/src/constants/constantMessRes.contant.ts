
export class RES_MESS {

    static CREATE(value: string) {
        return `Tạo ${value} thành công`
    }

    static ADD(value: string) {
        return `Thêm sản phẩm vào ${value} thành công `
    }


    static FIND_ALL(value: string) {
        return `Lấy toàn bộ ${value} thành công`
    }

    static FIND_BY_SLUG(value: string) {
        return `Lấy ${value} theo slug thành công`
    }

    static SORT_DELETED(value: string) {
        return `Xóa tạm thời ${value} thành công`
    }

    static RESTORE_DELETE(value: string) {
        return `Khôi phục ${value} thành công`
    }

    static DELETE(value: string) {
        return `Xóa ${value} thành công`
    }

    static UPDATE(value: string) {
        return `Cập nhật ${value} thành công`
    }

} 
