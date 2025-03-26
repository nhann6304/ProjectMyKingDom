import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Query } from '@nestjs/common';
import { CartsService } from './carts.service';
import { ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { OK } from 'src/core/response.core';
import { RES_MESS } from 'src/constants/constantMessRes.contant';
import { AuthGuard } from 'src/guards/auth.guard';
import { UpdateCartDetailDto } from '../cart-details/cart-details.dto';
import { AQueries } from 'src/abstracts/common/ABaseQueries.abstracts';
import { AddCartDto } from './cart.dto';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) { }


  @Post("add-to-cart")
  @ApiOperation({ summary: "Thêm sản phẩm vào giỏ hàng" })
  @UseGuards(AuthGuard)
  async addToCart(
    // @Param("id") id: string,
    @Body() addData: AddCartDto,
    @Req() req: Request
  ) {
    await this.cartsService.addToCart({ addData, req })
    return new OK({
      message: RES_MESS.ADD("Giỏ hàng")
    })
  }

  @Post("update")
  @ApiOperation({ summary: "Cập nhật giỏ hàng" })
  @UseGuards(AuthGuard)
  async updateToCart(
    @Body() payload: UpdateCartDetailDto,
    @Req() req: Request
  ) {

    await this.cartsService.updateToCart({ payload, req })

    return new OK({
      message: RES_MESS.UPDATE("Sản phẩm trong giỏ hàng")
    })
  }

  @Get("find-all")
  @ApiOperation({ summary: "Lấy giỏ hàng theo user" })
  @UseGuards(AuthGuard)
  async findAllCart(
    @Req() req: Request
  ) {
    const items = await this.cartsService.findAllCart({ req })

    return new OK({
      message: RES_MESS.FIND_ALL("Giỏ hàng"),
      metadata: items
    })
  }

  @Delete("delete/:id")
  @ApiOperation({ summary: "Xóa sản phẩm trong giỏ hàng" })
  @UseGuards(AuthGuard)

  async deletedCartProduct(
    @Param("id") id: string,
    @Req() req: Request
  ) {
    await this.cartsService.deleteProductToCart({ id, req });


    return new OK({
      message: RES_MESS.DELETE("Sản phẩm trong giỏ hàng")
    })
  }


}
