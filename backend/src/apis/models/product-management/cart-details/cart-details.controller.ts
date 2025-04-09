import { Controller } from "@nestjs/common";
import { CartDetailsService } from "./cart-details.service";

@Controller('cart-products')
export class CartDetailsController {
  constructor(private readonly cartProductsService: CartDetailsService) { }

}
