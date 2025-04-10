import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from './company.entity';
import { In, Repository, SelectQueryBuilder } from 'typeorm';
import { CreateCompanyDto } from './company.dto';
import { IUser } from 'src/interfaces/common/IUser.interface';
import { ImageEntity } from 'src/apis/common/images/image.entity';
import { AQueries } from 'src/abstracts/common/ABaseQueries.abstracts';
import { UtilConvert } from 'src/utils/convert.ultils';
import { UtilORM } from 'src/utils/orm.uutils';

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
        companyData: CreateCompanyDto[];
    }) {
        const me = req['users'] as IUser;

        // Lấy tất cả image id từ DTO
        const imageIds = companyData.map((c) => c.company_thumb_id);

        // Tìm những ảnh đã tồn tại trong DB
        const foundImages = await this.imagesRepository.find({
            where: {
                id: In(imageIds),
            },
        });

        // Tạo Set các id đã tồn tại
        const foundImageIds = new Set(foundImages.map((img) => img.id));

        // Kiểm tra xem có ảnh nào không tồn tại không
        const invalidCompanies = companyData.filter(
            (c) => !foundImageIds.has(c.company_thumb_id),
        );

        if (invalidCompanies.length > 0) {
            const invalidList = invalidCompanies.map(
                (c) => `${c.company_name}`,
            );
            throw new BadRequestException(
                `Hình ảnh của công ty ${invalidList} không tồn tại`,
            );
        }

        // Tạo Map để gán nhanh ảnh tương ứng
        const imageMap = new Map(foundImages.map((img) => [img.id, img]));

        // Tạo danh sách company cần insert
        const newCompanies = companyData.map((company) => {
            return this.companyRepository.create({
                company_name: company.company_name,
                company_thumb: imageMap.get(company.company_thumb_id),
                createdBy: me,
            });
        });

        // Lưu tất cả vào DB
        const result = await this.companyRepository.save(newCompanies);

        return result;
    }

    async getAllCompany(query: AQueries<CompanyEntity>) {
        const { limit, page, filter, sort, fields, isDeleted } = query;
        const ALIAS_NAME = 'companies';
        const objSort = UtilConvert.convertSortToObject(sort as any);
        const objFilter = UtilConvert.convertJsonToObject(filter as any);

        const result = new UtilORM<CompanyEntity>(
            this.companyRepository,
            ALIAS_NAME,
        ).select(fields);

        if (objFilter !== undefined) {
            result.where(objFilter, isDeleted);
        }

        const queryBuilderCount: SelectQueryBuilder<CompanyEntity> = result.build();

        const totalItems = await queryBuilderCount.getCount();

        const queryBuilder: SelectQueryBuilder<CompanyEntity> = result
            .skip({ limit, page })
            .take({ limit })
            .sort(objSort as any)
            .build();

        const items = await queryBuilder.getMany();
        const response = { items, totalItems };

        return response;
    }
}
