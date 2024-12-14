import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { CreateProductDto } from './product.dto';
import { Request } from 'express';
import { OK } from 'src/core/response.core';
import { RES_MESS } from 'src/constants/constantMessRes.contant';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post("create")
  @ApiOperation({ summary: "Tạo sản phẩm" })
  @UseGuards(AuthGuard, RoleGuard)
  async createProduct(
    @Body() productData: CreateProductDto,
    @Req() req: Request
  ) {
    const items = await this.productsService.createProduct({ req, productData })



    return new OK({
      message: RES_MESS.CREATE("Sản phẩm"),
      metadata: items
    })

  }
}
