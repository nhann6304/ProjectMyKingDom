import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ProductCategoriesService } from './product-categories.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateProductCategoryDto } from './product-category.dto';
import { OK } from 'src/core/response.core';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { Request } from 'express';
import { AQueries } from 'src/abstracts/common/ABaseQueries.abstracts';
import { ABaseModel } from 'src/abstracts/common/ABaseModel.abstracts';

@Controller('product-categories')
@ApiTags("Product-Categories")

export class ProductCategoriesController {
  constructor(private readonly productCategoriesService: ProductCategoriesService) { }

  @Post("create")
  @ApiOperation({ summary: 'Tạo danh mục sản phẩm' })
  @UseGuards(AuthGuard, RoleGuard)
  async createProductCate(
    @Body() productData: CreateProductCategoryDto,
    @Req() req: Request
  ) {
    const items = await this.productCategoriesService.createProductCate(req, productData)
    return new OK({
      message: "Tạo danh mục sản phẩm thành công",
      metadata: items
    })
  }

  @Get("find-all")
  @ApiOperation({ summary: 'Get all blog' })
  async findAll(
    @Query()
    queries: AQueries,
    @Req() req: Request,
  ) {

    const items = await this.productCategoriesService.findAll(queries, req)

    return new OK({
      message: "Oke",
      metadata: items
    });
  }

}
