import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from './company.entity';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './company.dto';
import { IUser } from 'src/interfaces/common/IUser.interface';
import { ImageEntity } from 'src/apis/common/images/image.entity';

@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(CompanyEntity)
        private companyRepository: Repository<CompanyEntity>,
        @InjectRepository(ImageEntity)
        private imagesRepository: Repository<ImageEntity>,
    ) { }

    async createCompany({
        req,
        companyData,
    }: {
        req: Request;
        companyData: CreateCompanyDto;
    }) {
        const me = req['users'] as IUser;


        const findCompanyImage = await this.imagesRepository.findOne({
            where: { id: companyData.company_thumb_id },
        });

        if (!findCompanyImage) {
            throw new BadRequestException('Hình ảnh không tồn tại');
        }

        const newCompanyData = this.companyRepository.create({
            company_name: companyData.company_name,
            company_thumb: findCompanyImage,
        });

        const result = await this.companyRepository.save(newCompanyData);

        return result;
    }
}
