import { BadRequestException, Controller, Post, Req, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CREATE, OK } from 'src/core/response.core';
import { ImagesService } from './images.service';
import { ApiOperation } from '@nestjs/swagger';
import { RES_MESS } from 'src/constants/constantMessRes.contant';
import { Request } from 'express';
import * as multer from 'multer';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) { }

  // @Post("upload")
  // @UseInterceptors(FileInterceptor("file"))
  // uploadFile(@UploadedFile() file: Express.Multer.File) {
  //   if (!file) {
  //     throw new BadRequestException("Upload hình không thành công");
  //   }

  //   console.log("file upload::", file);

  //   return new OK({
  //     message: "Upload hình oke"
  //   })

  // }

  @Post("upload")
  @ApiOperation({ summary: 'Upload hình ảnh' })
  @UseInterceptors(
    FilesInterceptor('file', 5, {
      storage: multer.memoryStorage(),
      limits: {
        fieldSize: 20 * 1024 * 1024,
        fieldNameSize: 100,
      },
    }),
  )
  // @UseGuards(AuthGuard)
  async uploadImage(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Req() req: Request,
  ) {
    if (!files || files.length === 0) {
      throw new BadRequestException("Upload hình không thành công");
    }

    const items = await this.imagesService.create({ payload: files, req })

    return new CREATE({
      message: RES_MESS.CREATE("Hình ảnh"),
      // metadata: items
    });
  }

}
