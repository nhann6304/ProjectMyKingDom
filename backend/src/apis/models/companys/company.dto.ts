import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { CONST_ERROR } from "src/constants";

export class CreateCompanyDto {
    @ApiProperty({
        example: 'Lego',
        description: 'Tên công ty',
    })
    @IsNotEmpty({ message: CONST_ERROR.FIELD_NOT_EMPTY('Tên công ty') })
    company_name: string;

    @ApiProperty({
        example: 'image-id-123',
        description: 'ID của hình ảnh thumbnail đã được upload',
    })
    @IsNotEmpty({ message: CONST_ERROR.FIELD_NOT_EMPTY('Ảnh thumbnail') })
    company_thumb_id: string; // hoặc number tùy kiểu ID
}
