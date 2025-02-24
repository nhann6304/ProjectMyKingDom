import { Flex, Switch, Card, Avatar } from "antd";
import styled from "styled-components";
import product from "@/assets/common/icon-public/jpg/product.test.webp";
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

const nhan = true;

export default function CardProduct() {
  const CardContainer = styled.div`
    height: auto;
    border: 1.5px solid var(--color-gray-200);
    border-radius: 2rem;
    overflow: hidden;
    .box-product {
      padding: 1rem;
      cursor: pointer;
      .box-product-item {
        display: flex;
        justify-content: center;
        img {
          padding: 1rem;
          object-position: center center;
          transform: scale(1) !important;
          max-width: 30rem;
          object-fit: contain;
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
          /* background-color: #eff5fd; */
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
            font-size: 1.5rem;
            line-height: 2rem;
            color: #8f8f8f;
            text-transform: capitalize;
            white-space: initial;
            overflow: hidden;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            display: -webkit-box;
            opacity: 0.8;
          }

          .info-sku {
            font-weight: 300;
            font-size: 1.5rem;
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
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .info-product-pay {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 2rem;
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
          padding: 5px;
          margin-top: 2px;
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
  `;

  return (
    <CardContainer>
      <div className="box-product">
        <div className="box-product-item">
          {/* <Image height={500} width={500} src={"http://localhost:9000/uploads/minhvycafe.jpg"} alt="product" /> */}
          <Image height={500} width={500} src={product} alt="product" />
        </div>

        {nhan && (
          <div className="box-product-sale">
            <span>Mua 1 tặng 1</span>
          </div>
        )}

        <div className="box-product-info">
          <div className="info-product-top">
            <span className="info-category">LEGO MARKETING</span>
            <span className="info-sku">SKU:MKT-5008978</span>
          </div>

          <span className="info-product-name">
            [Đồ chơi xe lắp ráp thể thao Ford Gt LEGO MARKETING 42154]
          </span>

          <div className="info-product-pay">
            <span className="payable">584.000Đ</span>
            <span className="pay-sale">584.000Đ</span>
          </div>

          <div className="info-control">
            <button className="btn-control">Thêm vào giỏ hàng</button>

            <span>
              <HearNotBg />
            </span>
          </div>
        </div>
      </div>
    </CardContainer>
  );
}
