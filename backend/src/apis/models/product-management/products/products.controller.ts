import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { CreateProductDto, UpdateProductDto } from './product.dto';
import { Request } from 'express';
import { OK } from 'src/core/response.core';
import { RES_MESS } from 'src/constants/constantMessRes.contant';
import { AQueries } from 'src/abstracts/common/ABaseQueries.abstracts';
import { ProductsEntity } from './product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post('create')
  @ApiOperation({ summary: 'Tạo sản phẩm' })
  @UseGuards(AuthGuard, RoleGuard)
  async createProduct(
    @Body() productData: CreateProductDto,
    @Req() req: Request,
  ) {
    const items = await this.productsService.createProduct({
      req,
      productData,
    });
    console.log(productData.image_ids);
    return new OK({
      message: RES_MESS.CREATE('Sản phẩm'),
      metadata: items,
    });
  }

  @Get('find-all')
  @ApiOperation({ summary: 'Lấy toàn bộ sản phẩm' })
  // @UseGuards(AuthGuard)
  async findAll(@Query() query: AQueries) {
    const items = await this.productsService.findAllProduct({ query });

    return new OK({
      message: RES_MESS.FIND_ALL('Sản phẩm'),
      metadata: items,
    });
  }

  @Get('find-product-by-slug-cate/:slug')
  @ApiOperation({ summary: 'Lấy sản phẩm bằng slug cate' })
  // @UseGuards(AuthGuard)
  async findProductBySlug(@Param('slug') slug: string, @Query() query: AQueries) {
    const items = await this.productsService.findProductBySlug(slug, query);
    return new OK({
      message: RES_MESS.FIND_BY_SLUG("Sản phẩm"),
      metadata: items
    })
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Cập nhập sản phẩm' })
  @UseGuards(AuthGuard, RoleGuard)
  async update(
    @Param('id') id: string,
    @Req() req: Request,
    @Body() updateData: UpdateProductDto,
  ) {
    const items = await this.productsService.updateProduct({
      id,
      req,
      updateData,
    });

    return new OK({
      message: RES_MESS.UPDATE('Sản phẩm'),
      metadata: items,
    });
  }

  @Patch('sort-delete/:id')
  @ApiOperation({ summary: 'Xóa mềm sản phẩm' })
  @UseGuards(AuthGuard, RoleGuard)
  async sortDelete(@Param('id') id: string, @Req() req: Request) {
    await this.productsService.sortDeleted({ req, id });

    return new OK({
      message: RES_MESS.SORT_DELETED('Sản phẩm'),
    });
  }

  @Patch('restore/:id')
  @ApiOperation({ summary: 'Khôi phục Sản phẩm' })
  @UseGuards(AuthGuard, RoleGuard)
  async restoreDelete(@Param('id') id: string) {
    await this.productsService.restoreDelete({ id });

    return new OK({
      message: RES_MESS.RESTORE_DELETE('Sản phẩm'),
    });
  }

  @Delete('deleted/:id')
  @ApiOperation({ summary: 'Xóa sản phẩm' })
  @UseGuards(AuthGuard, RoleGuard)
  async deletedProduct(@Param('id') id: string) {
    await this.productsService.deleteProduct(id);

    return new OK({
      message: RES_MESS.DELETE('Sản phẩm'),
    });
  }
}
