import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsInt } from 'class-validator';
import { Transform } from 'class-transformer';
import { IQueries } from "src/interfaces/common/IBaseQueries.interface";

export class AQueries<T = any> implements Partial<IQueries<T>> {
    @IsOptional()
    @ApiProperty({
        type: [String],
        required: false,
        title: "Get fields",
        description: 'Lấy các trường',
    })
    fields?: Array<string>;

    @IsOptional()
    @ApiProperty({
        type: "number",
        title: "Lấy bao nhiêu",
        default: 10,
        required: false,
        description: 'Giới hạn item trong một trang',

    })
    limit?: number;


    @IsOptional()
    @ApiProperty({
        type: "number",
        title: "Số trang",
        minimum: 1,
        format: 'int32',
        default: 1,
        required: false,
        description: 'Hiển thị trang hiện tại',
    })
    page?: number;
}
