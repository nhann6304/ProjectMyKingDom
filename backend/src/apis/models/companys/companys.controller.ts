import {
    Body,
    Controller,
    Get,
    Post,
    Query,
    Req,
    UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { CreateCompanyDto } from './company.dto';
import { CompanyService } from './companys.service';
import { OK } from 'src/core/response.core';
import { RES_MESS } from 'src/constants/constantMessRes.contant';
import { AQueries } from 'src/abstracts/common/ABaseQueries.abstracts';

@Controller('company')
export class CompanyController {
    constructor(private readonly companyService: CompanyService) { }

    @Post('create')
    @ApiOperation({ summary: 'Thêm công ty' })
    @ApiBody({
        type: [CreateCompanyDto],
        description: 'Danh sách các công ty cần tạo',
    })
    @UseGuards(AuthGuard, RoleGuard)
    async createCompany(
        @Body() companyData: CreateCompanyDto[],
        @Req() req: Request,
    ) {
        const items = await this.companyService.createCompany({ companyData, req });
        return new OK({
            message: RES_MESS.CREATE('Công ty'),
            metadata: items,
        });
    }

    @Get('find-all')
    @ApiOperation({ summary: 'Lấy tất cả công ty' })
    @UseGuards(AuthGuard)
    async getAllCompany(@Query() query: AQueries) {
        const items = await this.companyService.getAllCompany(query);
        return new OK({
            message: RES_MESS.FIND_ALL('Công ty'),
            metadata: items,
        });
    }
}
