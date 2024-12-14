import { EAgeGroup } from "src/enums/EAge.enum";

export interface IProduct {
    prod_name: string;
    prod_thumb: string;
    prod_company: string; // Thương hiệu
    prod_sku: string; // Mã hàng hóa
    prod_slug: string;
    prod_price: number;
    prod_description: string;
    prod_quantity: number; // Số lượng tồn
    prod_nation: string; // Xuất xứ
    prod_agePlay: EAgeGroup; //  Độ tuổi
    shipping_code?: string; // Mã vận chuyển
    discount?: number; // giảm giá
}