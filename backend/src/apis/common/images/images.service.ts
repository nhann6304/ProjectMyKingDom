import * as sharp from 'sharp';
import * as path from 'path';
import { Injectable } from '@nestjs/common';
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
      console.log(file);

      const createData = await this.imagesRepositories.create({
        img_key: "",
        img_path: filePath,
        img_format: file.mimetype.split("/")[0],
        img_size: file.size,
        img_heigh: height,
        img_width: width,
        img_url: `${HOST_SERVER}/${file.originalname}`,
        img_alt: file.originalname.split(".")[0],
        // updatedAt: null,
        createdBy: me
      })

      return this.imagesRepositories.save(createData);
    });

    const imageUpload = await Promise.all(uploadPromise);
    return imageUpload
  }
}
