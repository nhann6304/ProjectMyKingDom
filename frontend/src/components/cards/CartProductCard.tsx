"use client";

import Image from "next/image";
import styled from "styled-components";
import { TrashIcon } from "@/assets/common/icon-public/svg/icon/iconItem";
import InputQuantityCircle from "../inputs/input-quantity-circle";
import { useState, useEffect, useRef } from "react";
import { IProduct } from "@/interfaces/models/IProducts.interface";
import { convertPriceToString } from "@/utils";
import useDebounce from "@/hooks/useDebounce";

const CardComponent = styled.div`
  width: 100%;
  height: auto;
  padding: 1rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #8f8f8f8f;

  .cart-box {
    width: 100%;
    display: grid;
    grid-template-columns: 20% 75%;
    align-items: center;
    gap: 1rem;
  }

  img {
    height: 12.4rem;
    width: 9.6rem;
    object-fit: cover;
  }

  .container-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 90%;
    gap: 1rem;

    &-top {
      display: grid;
      grid-template-columns: 85% 15%;
      width: 100%;

      .prod-name {
        font-size: 1.4rem;
        line-height: 2rem;
        color: #041675;
        word-wrap: break-word;
        overflow-wrap: break-word;
        white-space: normal;
      }

      .prod-icon {
        margin: 0 auto;
        margin-top: 1rem;
        cursor: pointer;
      }
    }

    &-bottom {
      display: grid;
      grid-template-columns: 70% 30%;
      width: 100%;

      .price-prod-total {
        display: flex;
        align-items: center;
        font-size: 1.6rem;
        font-weight: 600;
        color: var(--color-background-global);
      }
    }
  }
`;

interface IProps {
  product: IProduct;
  quantity: number;
  onQuantityChange?: (value: number) => void; // Callback khi quantity thay đổi
  onDeleteProductCart?: (IdProduct: string) => void
}

export default function CartProductCard({
  product,
  quantity,
  onQuantityChange,
  onDeleteProductCart
}: IProps) {
  const [value, setValue] = useState<number>(quantity);
  const debouncedQuantity = useDebounce(value, 1000);
  //
  useEffect(() => {
    if (onQuantityChange) {
      onQuantityChange(debouncedQuantity);
    }
  }, [debouncedQuantity]);
  //
  const handleDeleteProduct = (id: string) => {
    if (!onDeleteProductCart) return
    onDeleteProductCart(id)
  }
  return (
    <CardComponent>
      <div className="cart-box">
        {/* Hình ảnh sản phẩm */}
        <Image
          height={500}
          width={500}
          src={product?.prod_thumb}
          alt="hinhanh"
        />

        {/* Thông tin sản phẩm */}
        <div className="container-info">
          <div className="container-info-top">
            <span className="prod-name">{product?.prod_name}</span>
            <span className="prod-icon" onClick={() => handleDeleteProduct(String(product?.id))}>
              <TrashIcon />
            </span>
          </div>

          <div className="container-info-bottom">
            <div className="btn-control">
              <InputQuantityCircle
                defaultValue={quantity}
                onChange={(newValue) => setValue(newValue)}
              />
            </div>
            <span className="price-prod-total">
              {convertPriceToString(
                String((product.prod_price_official ?? 0) * value)
              )}
            </span>
          </div>
        </div>
      </div>
    </CardComponent>
  );
}
