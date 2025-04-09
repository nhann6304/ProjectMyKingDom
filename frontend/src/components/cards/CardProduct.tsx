import { Flex, Switch, Card, Avatar } from "antd";
import styled from "styled-components";
import productImage from "@/assets/common/icon-public/jpg/product.test.webp";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import Image from "next/image";
import ButtonCommon from "../buttons/ButtonCommon";
import ButtonForm from "../buttons/ButtonForm";
import { HearNotBg } from "@/assets/common/icon-public/svg/icon/iconItem";
import { IProduct } from "@/interfaces/models/IProducts.interface";
import { convertDiscount, convertPriceToString } from "@/utils";
import { FaPercent } from "react-icons/fa";
import Link from "next/link";
const nhan = false;

interface IProps {
  product?: IProduct;
}

const CardContainer = styled.div`
  height: auto;
  border: 1.5px solid var(--color-gray-200);
  border-radius: 2rem;
  overflow: hidden;
  background-color: white;
  .box-product {
    display: block;
    padding: 1rem;
    position: relative;
    cursor: pointer;

    .box-product-discount {
      position: absolute;
      border-radius: 8px;
      height: auto;
      width: auto;
      background-color: var(--color-background-global);
      z-index: 1;
      right: 5%;
      top: 2%;

      span {
        display: block;
        padding: 5px 1.6rem;
        color: var(--color-white);
        font-weight: 700;
        font-size: 1.6rem;
      }
    }

    .box-product-item {
      display: flex;
      justify-content: center;
      img {
        padding: 1.2rem;
        object-position: center center;
        transform: scale(1);
        max-width: 30rem;
        max-height: 30rem;
        height: 30rem;
        width: 100%;
        object-fit: cover;
        border-radius: 1.4rem;
        transition: transform 0.3s ease-in-out;
        &:hover {
          transform: scale(1.1);
        }
      }

      .box-icon-tym {
        display: none;
      }
    }

    .box-product-sale {
      padding: 1rem 2rem;
      span {
        padding: 8px 1rem;
        width: auto;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        background-color: rgba(252, 184, 51, 1);
        border-radius: 5px;
        font-weight: 600;
        font-size: 1.3rem;
      }
    }

    .box-product-info {
      padding: 1rem 2rem;
      .info-product-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: nowrap;
        row-gap: 5px;
        .info-category {
          font-weight: 300;
          font-size: 1.4rem;
          line-height: 2rem;
          color: #8f8f8f;
          text-transform: capitalize;
          white-space: initial;
          overflow: hidden;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          display: -webkit-box;
          opacity: 0.8;
          text-transform: uppercase;
        }

        .info-sku {
          font-weight: 300;
          font-size: 1.4rem;
          line-height: 2rem;
          text-transform: capitalize;
          color: #8f8f8f;
          text-align: right;
        }
      }

      .info-product-name {
        display: block;
        width: 100%;
        margin-top: 5px;
        margin-top: 3px;
        line-clamp: 2;
        margin-bottom: 8px;
        min-height: 3.2rem;
        font-weight: 300;
        font-size: 1.4rem;
        line-height: 2rem;
        color: #041675;
        display: -webkit-box;
        overflow: hidden;
        min-height: 4rem;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .info-product-pay {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 1rem;
        font-weight: 700;

        .payable {
          font-size: 1.8rem;
          line-height: 2.4rem;
          text-transform: capitalize;
          color: #cf102d;
        }

        .pay-sale {
          text-decoration-line: line-through;
          text-transform: uppercase;
          color: #8f8f8f;
          font-weight: 400;
          font-size: 16px;
          line-height: 20px;
        }
      }

      .info-control {
        display: flex;
        align-items: center;
        gap: 2rem;
        justify-content: space-between;
        margin-top: 1rem;
        .btn-control {
          background-color: var(--color-background-global);
          padding: 1.4rem;
          width: 100%;
          font-weight: 700;
          font-size: 16px;
          color: #f2f2f2;
          border-radius: 1.4rem;
        }
      }
    }
  }

  @media (max-width: 1440px) {
    .box-product {
      .box-product-info {
        padding: 1rem 5px;
        .info-product-pay {
          font-weight: 700;

          .payable {
            font-size: 1.6rem;
          }

          .pay-sale {
            font-size: 1.4rem;
          }
        }
      }
    }
  }

  @media (max-width: 1024px) {
    .box-product {
      .box-product-item {
        position: relative;
        .box-icon-tym {
          position: absolute;
          bottom: 0;
          right: -1%;
          height: auto;
          width: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f2f2f2;
          border-radius: 100%;
          span {
            padding: 1rem;
          }
        }

        img {
          transform: scale(1) !important;
          max-height: 20rem;
        }
      }

      .box-product-info {
        padding: 1rem 5px;
        .info-control {
          span {
            display: none;
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    .box-product {
      .box-product-info {
        .info-control {
          .btn-control {
            padding: 1rem;
            font-size: 1.4rem;
          }
        }
      }
    }
  }

  @media (max-width: 576px) {
    .box-product {
      display: block;
      padding: 1rem;
      position: relative;
      cursor: pointer;

      .box-product-item {
        img {
          max-width: 100%;
          max-height: 20rem;
        }
      }

      .box-product-info {
        .info-product-top{
            .info-sku{
              display: none;
            }

            .info-category{
              font-size: 1.2rem;
            }
        }
        .info-control {
          .btn-control {
            font-size: 1.1rem;
          }
        }

        .info-product-name{
          font-size: 1.2rem;
        }

        .info-product-pay{
          margin: 0;
          flex-direction: column;
          align-items: flex-start;
        }
      }
    }
  }
`;

export default function CardProduct({ product }: IProps) {
  return (
    <CardContainer>
      <Link
        href={`/products/details/${product?.prod_slug}`}
        className="box-product"
      >
        <div className="box-product-discount">
          {Math.floor(product?.discount as number) !== 0 && (
            <span>-{convertDiscount(product?.discount as number)}%</span>
          )}
        </div>
        <div className="box-product-item">
          <Image
            height={500}
            width={500}
            src={
              product?.prod_thumb ||
              "http://localhost:9000/uploads/minhvydalat.jpg"
            }
            alt="product"
          />
          <div className="box-icon-tym">
            <span>
              <HearNotBg />
            </span>
          </div>
        </div>

        {nhan && (
          <div className="box-product-sale">
            <span>Mua 1 tặng 1</span>
          </div>
        )}

        <div className="box-product-info">
          <div className="info-product-top">
            {/* <span className="info-category">{product?.prod_company}</span> */}
            <span className="info-sku">SKU:{product?.prod_sku}</span>
          </div>

          <span className="info-product-name">{product?.prod_name}</span>

          <div className="info-product-pay">
            <span className="payable">
              {convertPriceToString(String(product?.prod_price_official))}
            </span>
            {product?.prod_price_official !== product?.prod_price && (
              <span className="pay-sale">
                {convertPriceToString(String(product?.prod_price))}
              </span>
            )}
          </div>

          <div className="info-control">
            <button className="btn-control">Thêm vào giỏ hàng</button>
            <span>
              <HearNotBg />
            </span>
          </div>
        </div>
      </Link>
    </CardContainer>
  );
}
