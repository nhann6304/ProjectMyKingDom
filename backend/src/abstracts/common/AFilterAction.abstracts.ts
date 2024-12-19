import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, ValidateNested } from "class-validator";
import { IFilter, IRange } from "src/interfaces/common/IFilterAction.interface";

class Range implements IRange {
    @ApiProperty({
        type: Number,
        description: 'Giá trị tối thiểu',
    })
    min: number;

    @ApiProperty({
        type: Number,
        description: 'Giá trị tối đa',
    })
    max: number;
}
export class FilterItem implements IFilter {
    @IsString()
    @ApiProperty({
        type: String,
        description: 'Tên trường để lọc (field)',
    })
    f: any;


    @ApiProperty({
        oneOf: [
            { type: 'string', description: 'Giá trị là chuỗi' },
            { $ref: '#/components/schemas/Range', description: 'Giá trị là object min/max' },
        ],
        description: 'Giá trị của trường để lọc (string hoặc object)',
    })
    @ValidateNested()
    @Type(() => Object)
    v: string | Range;
}