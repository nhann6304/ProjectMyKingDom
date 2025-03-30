import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, IsArray, IsEnum, ValidateNested } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { IQueries } from 'src/interfaces/common/IBaseQueries.interface';
import { FilterItem, FilterQuery } from './AFilterAction.abstracts';
import { IFilter } from 'src/interfaces/common/IFilterAction.interface';
import { SortOptions } from 'src/enums/ESort.enum';
import { SortQuery } from './ASortAction.abstracts';

export class AQueries<T = any> implements Partial<IQueries<T>> {
    @IsOptional()
    @ApiProperty({
        type: [String],
        required: false,
        title: 'Get fields',
        description: 'Lấy các trường',
    })
    fields?: Array<T>;

    @IsOptional()
    @ApiProperty({
        type: 'number',
        title: 'Lấy bao nhiêu',
        default: 10,
        required: false,
        description: 'Giới hạn item trong một trang',
    })
    limit?: number;

    @IsOptional()
    @ApiProperty({
        type: 'number',
        title: 'Số trang',
        minimum: 1,
        format: 'int32',
        default: 1,
        required: false,
        description: 'Hiển thị trang hiện tại',
    })
    page?: number;

    @IsOptional()
    @ApiProperty({
        type: [FilterQuery],
        description: 'Danh sách các trường cần lọc',
        required: false,
    })
    filter?: FilterQuery[];

    @IsOptional()
    @ApiProperty({
        type: [SortQuery],
        description: "Danh sách các trường cần sắp xếp",
        required: false,
        example: [
            { field: "blog_name", order: "ASC" },
            { field: "created_at", order: "DESC" }
        ]
    })
    // @ValidateNested({ each: true })
    // @Type(() => SortQuery)
    sort?: SortQuery;

    @IsOptional()
    @ApiProperty({
        type: 'boolean',
        title: 'Thùng rác',
        default: true,
        required: true,
        description: 'Hiển thị trang hiện tại',
    })
    isDeleted: string;
}
