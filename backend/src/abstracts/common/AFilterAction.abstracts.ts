import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsArray,
    IsObject,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';
import { IFilter, IRange } from 'src/interfaces/common/IFilterAction.interface';

class Range implements IRange {
    @ApiProperty({ type: Number, description: 'Giá trị tối thiểu' })
    min: number;

    @ApiProperty({ type: Number, description: 'Giá trị tối đa' })
    max: number;
}

export class FilterItem {
    @IsString()
    @ApiProperty({
        example: 'prod_price',
        description: 'Tên trường để lọc (field)',
    })
    f: string;

    @ApiProperty({
        oneOf: [
            { type: 'string', example: 'Việt Nam', description: 'Giá trị là chuỗi' },
            {
                $ref: '#/components/schemas/Range',
                description: 'Giá trị là object min/max',
            },
        ],
        description: 'Giá trị của trường để lọc (string hoặc object)',
    })
    @IsOptional()
    v: string | Range;
}

export class FilterQuery {
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => FilterItem)
    @ApiProperty({
        type: [FilterItem],
        description: 'Danh sách các trường cần lọc',
        required: false,
        example: [{ f: 'prod_nation', v: 'Việt Nam' }],
    })
    filter?: FilterItem[];
}
