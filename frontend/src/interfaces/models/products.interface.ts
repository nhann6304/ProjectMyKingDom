import { EAgeGroup } from "@/enums/EAge.enum";
import { IProductCategory } from "./product-categories.interface";

export interface IProduct {
    id?: any;
    pc_category?: IProductCategory
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