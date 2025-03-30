import { IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { SortOptions } from 'src/enums/ESort.enum';

class SortItem {
    @ApiProperty({ example: 'blog_name', description: 'Trường cần sắp xếp' })
    @IsString()
    field: string;

    @ApiProperty({
        example: SortOptions.NAME_ASC,
        enum: SortOptions,
        description: 'Thứ tự sắp xếp (ASC hoặc DESC)',
    })
    @IsEnum(SortOptions, { message: 'Giá trị order không hợp lệ' })
    order: SortOptions;
}

export class SortQuery {
    @ApiProperty({
        type: SortItem,
        description: 'Tiêu chí sắp xếp duy nhất',
        required: false,
        example: { field: 'blog_name', order: SortOptions.NAME_ASC },
    })
    @IsOptional()
    @ValidateNested()
    @Type(() => SortItem)
    sort?: SortItem;
}
