import { EAgeGroup } from 'src/enums/EAge.enum';
import { EGender } from 'src/enums/EGender.enum';
import { IImage } from '../common/images.interface';

export interface IProduct {
    prod_name: string;
    prod_thumb: string;
    prod_thumbnails?: IImage[]
    prod_company: string; // Thương hiệu
    prod_sku: string; // Mã hàng hóa
    prod_slug: string;
    prod_price: number;
    prod_price_official?: number;
    prod_description: string;
    prod_gender: EGender[];
    prod_quantity: number; // Số lượng tồn
    prod_nation: string; // Xuất xứ
    prod_agePlay: EAgeGroup; //  Độ tuổi
    shipping_code?: string; // Mã vận chuyển
    discount?: number; // giảm giá
}
