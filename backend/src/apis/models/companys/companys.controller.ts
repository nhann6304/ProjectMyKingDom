import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { CreateCompanyDto } from './company.dto';
import { CompanyService } from './companys.service';
import { OK } from 'src/core/response.core';
import { RES_MESS } from 'src/constants/constantMessRes.contant';

@Controller('company')
export class CompanyController {
    constructor(private readonly companyService: CompanyService) { }
    @Post('create')
    @ApiOperation({ summary: 'Thêm công ty' })
    @UseGuards(AuthGuard, RoleGuard)
    async createProduct(
        @Body() companyData: CreateCompanyDto,
        @Req() req: Request,
    ) {
        const items = await this.companyService.createCompany({ companyData, req });
        return new OK({
            message: RES_MESS.CREATE("Công ty"),
            metadata: items
        })
    }
}
