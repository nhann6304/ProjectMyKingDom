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
        minimum: 1,
        maximum: 100,
        default: 1,
        description: 'Lấy các trường',
    })
    fields?: Array<keyof T>;

    @IsOptional()
    @ApiProperty({
        type: "number",
        title: "Lấy bao nhiêu",
        description: 'Giới hạn item trong một trang',

    })
    limit?: number;

    @ApiProperty({
        type: "number",
        title: "Số trang",
        minimum: 1,
        format: 'int32',
        default: 1,
        description: 'Hiển thị trang hiện tại',

    })
    @IsOptional()
    page?: number;
}
