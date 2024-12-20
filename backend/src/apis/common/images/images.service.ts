import * as sharp from 'sharp';
import * as path from 'path';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { promises as fs } from 'fs';
import { ImageEntity } from './image.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(ImageEntity)
    private readonly imagesRepositories: Repository<ImageEntity>,
  ) { }




  async findById({ id }: { id: string }) {
    const data = await this.imagesRepositories.findOne({
      where: { id },
      // relations: {
      //   pc_category: true
      // }
    })
    return data
  }


  async create({
    req,
    payload
  }: {
    req: Request,
    payload: Express.Multer.File[];
  }) {

    const me = req['user'];
    const uploadPromise = payload.map(async (file) => {
      const imageMetadata = await sharp(file.buffer).metadata();
      const { width, height } = imageMetadata;
      const backFolder = ['..', '..', '..', '..'];

      const uploadsPath = path.resolve(
        __dirname,
        ...backFolder,
        // 'public',
        'uploads',
      );

      const HOST_SERVER = "http://localhost:9000/uploads";

      const filePath = path.join(uploadsPath, file.originalname);

      // tạo folder nếu chưa có
      await fs.mkdir(uploadsPath, { recursive: true });

      // Tạo 1 file hình theo thông tin của buffer vào thư mục đã định sẳn
      await fs.writeFile(filePath, file.buffer);

      // Lưu database
      const createData = await this.imagesRepositories.create({
        img_key: "",
        img_path: filePath,
        img_format: file.mimetype.split("/")[0],
        img_size: file.size,
        img_heigh: height,
        img_width: width,
        img_url: `${HOST_SERVER}/${file.originalname}`,
        img_alt: file.originalname.split(".")[0],
        createdBy: me
      })

      return this.imagesRepositories.save(createData);
    });

    const imageUpload = await Promise.all(uploadPromise);
    return imageUpload
  }


  async sortDeleted({ id, req }: { req: Request, id: string }) {
    const me = req['user']

    const findImage = await this.findById({ id });

    if (!findImage) {
      throw new BadRequestException("Hình ảnh không tồn tại");
    }

    if (findImage.isDeleted) {
      throw new BadRequestException("Hình ảnh đã được xóa");

    }

    await this.imagesRepositories.update(id, {
      isDeleted: true,
      deletedBy: me,
      deletedAt: new Date()
    })

    return true
  }

  async restoreDelete({ id }: { id: string }) {

    const findImage = await this.findById({ id });

    if (!findImage) {
      throw new BadRequestException("Hình ảnh không tồn tại");
    }

    if (!findImage.isDeleted) {
      throw new BadRequestException("Hình ảnh đã được khôi phục");
    }

    await this.imagesRepositories.update(id, {
      isDeleted: false,
      deletedAt: null
    })

    return true
  }

  async deleteProduct(id: string): Promise<boolean> {

    const findImage = await this.imagesRepositories.findOne({ where: { id }, });


    if (!findImage) {
      throw new BadRequestException("Hình ảnh không tồn tại");
    }

    if (findImage.isDeleted === false) {
      throw new BadRequestException("Hình ảnh không nằm trong thùng rác");
    }

    await this.imagesRepositories.delete(id);

    return true
  }

}
