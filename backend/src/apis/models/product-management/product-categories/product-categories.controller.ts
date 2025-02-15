import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AQueries } from 'src/abstracts/common/ABaseQueries.abstracts';
import { RES_MESS } from 'src/constants/constantMessRes.contant';
import { OK } from 'src/core/response.core';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { ProductCategoriesService } from './product-categories.service';
import { CreateProductCategoryDto, UpdateProductCategoriesDto } from './product-category.dto';
import { audit } from 'rxjs';
import { Request } from 'express';

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
      message: RES_MESS.CREATE("Danh mục sản phẩm"),
      metadata: items
    })
  }

  @Get("find-all")
  @ApiOperation({ summary: 'Láy toàn bộ danh mục sản phẩm' })
  @UseGuards(AuthGuard)
  async findAll(
    @Query()
    queries: AQueries,
    @Req() req: Request,
  ) {
    console.log(queries);
    const items = await this.productCategoriesService.findAll(queries, req)
    return new OK({
      message: RES_MESS.FIND_ALL("Danh mục sản phẩn"),
      metadata: items
    });
  }

  @Patch("update/:id")
  @ApiOperation({ summary: "Cập nhật danh mục sản phẩm" })
  @UseGuards(AuthGuard, RoleGuard)
  async update(
    @Param("id") id: string,
    @Req() req: Request,
    @Body() updateData: UpdateProductCategoriesDto
  ) {

    const items = await this.productCategoriesService.update({ id, req, updateData })

    return new OK({
      message: RES_MESS.UPDATE("Danh mục sản phẩm"),
      metadata: items
    })
  }

  @Patch("sort-delete/:id")
  @ApiOperation({ summary: "Xóa mềm danh mục sản phẩm" })
  @UseGuards(AuthGuard, RoleGuard)
  async sortDelete(
    @Param("id") id: string,
    @Req() req: Request
  ) {

    await this.productCategoriesService.sortDeleted({ req, id })

    return new OK({
      message: RES_MESS.SORT_DELETED("Danh mục sản phẩm"),
    })
  }


  @Patch("restore/:id")
  @ApiOperation({ summary: "Khôi phục danh mục sản phẩm" })
  @UseGuards(AuthGuard, RoleGuard)
  async restoreDelete(
    @Param("id") id: string,
  ) {

    await this.productCategoriesService.restoreDelete({ id })

    return new OK({
      message: RES_MESS.RESTORE_DELETE("Danh mục sản phẩm"),
    })
  }

  @Delete("deleted/:id")
  @ApiOperation({ summary: "Xóa danh mục sản phẩm" })
  @UseGuards(AuthGuard, RoleGuard)
  async deleted(
    @Param("id") id: string
  ) {

    await this.productCategoriesService.deletedProductCate(id)
    new OK({
      message: RES_MESS.DELETE("Danh mục sản phẩm")
    })
  }


}
