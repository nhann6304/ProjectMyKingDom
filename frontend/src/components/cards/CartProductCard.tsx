"use client";

import Image from "next/image";
import styled from "styled-components";
import hinhanh from "@/assets/common/icon-public/jpg/product.test.webp";
import { TrashIcon } from "@/assets/common/icon-public/svg/icon/iconItem";
import InputQuantityCircle from "../inputs/input-quantity-circle";
import { useState } from "react";
import { IProduct } from "@/interfaces/models/products.interface";
import { convertPriceToString } from "@/utils";

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
    flex-direction: column; /* Chia top và bottom thành 2 hàng */
    justify-content: space-between;
    height: 90%;
    gap: 1rem;

    &-top {
      display: grid;
      grid-template-columns: 85% 15%;
      height: auto;
      width: 100%;
      /* padding: 0.5rem 0.5rem 0 0.5rem; */
      .prod-name {
        display: block;
        max-width: 100%;
        max-height: auto;
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
      }
    }

    &-bottom {
      display: grid;
      height: auto;
      width: 100%;
      grid-template-columns: 75% 25%;

      .price-prod-total{
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
  product: IProduct
}

export default function CartProductCard({ product }: IProps) {
  const [value, setValue] = useState<number>(1);
  const handleSetValue = (e: number) => {
    console.log("què", e);
  };
  return (
    <CardComponent>
      <div className="cart-box">
        {/* Hình ảnh sản phẩm */}
        <Image height={500} width={500} src={product?.prod_thumb} alt="hinhanh" />

        {/* Phần chứa thông tin sản phẩm */}
        <div className="container-info">
          <div className="container-info-top">
            <span className="prod-name">
              {product?.prod_name}
            </span>

            <span className="prod-icon">
              <TrashIcon />
            </span>
          </div>
          <div className="container-info-bottom">
            <div className="btn-control">
              <InputQuantityCircle
                defaultValue={1}
                onChange={(value) => handleSetValue(value)}
              />
            </div>
            <span className="price-prod-total">{convertPriceToString(String(product?.prod_price_official))}</span>
          </div>
        </div>
      </div>
    </CardComponent>
  );
}
