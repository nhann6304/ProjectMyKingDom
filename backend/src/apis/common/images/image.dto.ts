import { PartialType, ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { ABaseModel } from "src/abstracts/common/ABaseModel.abstracts";
import { CONST_ERROR } from "src/constants";
import { Entity } from "typeorm";
import { ImageEntity } from "./image.entity";
import { UserEntity } from "src/apis/models/users/user.entity";

@Entity("images")
export class CreateImageDto extends PartialType(ImageEntity) {
    @ApiProperty({ type: String })
    img_key: string;

    @ApiProperty({ type: String })
    img_alt: string;

    @ApiProperty({ type: String })
    img_format: string;

    @ApiProperty({ type: String })
    img_path: string;

    @ApiProperty({ type: String })
    @IsNotEmpty({ message: CONST_ERROR.FIELD_NOT_EMPTY('Url of img') })
    img_url: string;

    @ApiProperty({ type: Number })
    img_heigh: number;

    @ApiProperty({ type: Number })
    img_size: number;

    @ApiProperty({ type: Number })
    img_width: number;
}

