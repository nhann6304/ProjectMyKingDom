import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartDetailsService } from './cart-details.service';

@Controller('cart-products')
export class CartDetailsController {
  constructor(private readonly cartProductsService: CartDetailsService) { }

}
