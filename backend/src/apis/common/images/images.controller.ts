import { BadRequestException, Controller, Delete, Param, Patch, Post, Req, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CREATE, OK } from 'src/core/response.core';
import { ImagesService } from './images.service';
import { ApiOperation } from '@nestjs/swagger';
import { RES_MESS } from 'src/constants/constantMessRes.contant';
import { Request } from 'express';
import * as multer from 'multer';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';

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

  @UseGuards(AuthGuard)
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



  @Patch("sort-delete/:id")
  @ApiOperation({ summary: "Xóa mềm hình ảnh" })
  @UseGuards(AuthGuard, RoleGuard)
  async sortDelete(
    @Param("id") id: string,
    @Req() req: Request
  ) {

    await this.imagesService.sortDeleted({ req, id })

    return new OK({
      message: RES_MESS.SORT_DELETED("Hình ảnh"),
    })
  }


  @Patch("restore/:id")
  @ApiOperation({ summary: "Khôi phục hình ảnh" })
  @UseGuards(AuthGuard, RoleGuard)
  async restoreDelete(
    @Param("id") id: string,
  ) {

    await this.imagesService.restoreDelete({ id })

    return new OK({
      message: RES_MESS.RESTORE_DELETE("Hình ảnh"),
    })
  }

  @Delete("deleted/:id")
  @ApiOperation({ summary: "Xóa hình ảnh" })
  @UseGuards(AuthGuard, RoleGuard)
  async deletedProduct(
    @Param("id") id: string
  ) {
    await this.imagesService.deleteProduct(id);

    return new OK({
      message: RES_MESS.DELETE("Hình ảnh")
    })

  }
}
