import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { IFilter } from "src/interfaces/common/IFilterAction.interface";

export class FilterItem implements IFilter {
    @IsString()
    @ApiProperty({
        type: String,
        description: 'Tên trường để lọc (field)',
    })
    f: any;


    @IsString()
    @ApiProperty({
        type: String,
        description: 'Giá trị của trường để lọc',
    })
    v: string;
}