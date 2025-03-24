"use client";

import Image from "next/image";
import styled from "styled-components";
import hinhanh from "@/assets/common/icon-public/jpg/product.test.webp";
import InputQuantityCircle from "../inputs/input-quantity-circle";
import { useState } from "react";

const CardContainer = styled.div`
  height: 100%;

  .card-container {
    display: grid;
    gap: 3rem;
    padding-right: 5rem;
    grid-template-columns: 20% auto; /* Cột phải co dãn linh hoạt */
    align-items: center; /* Căn giữa nếu card-right ngắn */
    margin-top: 2rem;
    padding-bottom: 5px;
    border-bottom: 2px solid red;
    .card-left {
      img {
        height: 15rem;
        width: 15rem;
        object-fit: cover;
        border-radius: 1.2rem;
      }
    }

    .card-right {
      display: flex;
      flex-direction: column;
      justify-content: space-between; /* Giữ footer luôn ở dưới */
      min-width: 0; /* Tránh tràn lưới */
      min-height: 12rem; /* Đảm bảo không quá thấp */
      max-height: 25rem; /* Không cho cao quá */
      padding: 1rem 0; /* Thêm khoảng cách cho đẹp */
    }

    .prod_name {
      display: -webkit-box;
      -webkit-line-clamp: 3; /* Hiển thị tối đa 3 dòng */
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 1.5rem;
      font-weight: 700;
      line-height: 1.5;
    }

    .prod-quantity-option {
      display: flex;
      align-items: center;
      margin-top: 1rem;
      gap: 2rem;

      span {
        font-size: 1.4rem;
      }
    }

    .prod-footer {
      margin-top: auto; /* Đẩy footer xuống dưới */
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }

    .footer-delete {
      font-size: 1.4rem;
      text-decoration: underline;
      cursor: pointer;
    }

    .prod-price {
      font-size: 1.6rem;
      font-weight: bold;
    }
  }

  @media (max-width: 768px) {
    .card-container {
      gap: 1rem;
      margin-top: 1rem;
      padding-right: 2rem;
      grid-template-columns: 30% auto; /* Cột trái 30%, cột phải co giãn */

      .card-left {
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          height: 12rem;
          width: 12rem;
        }
      }

      .card-right {
        padding: 0.5rem;
        min-height: auto;
      }

      .prod_name {
        font-size: 1.4rem;
        -webkit-line-clamp: 2;
      }

      .prod-quantity-option {
        gap: 1rem;
        span {
          font-size: 1.2rem;
        }
      }

      .prod-footer {
        margin-top: 1rem;
        align-items: flex-start;

        .footer-delete {
          font-size: 1.2rem;
        }

        .prod-price {
          font-size: 1.4rem;
        }
      }
    }
  }
`;

export default function CardProductItem() {
  const [value, setValue] = useState<number>(0);

  return (
    <CardContainer>
      <div className="card-container">
        <div className="card-left">
          <Image src={hinhanh} alt="Hình ảnh sản phẩm" />
        </div>

        <div className="card-right">
          <span className="prod_name">
            Đồ chơi phà chuyên phà chuyên dụng BATTAT
          </span>

          <div className="prod-quantity-option">
            <span>Số lượng</span>
            <InputQuantityCircle
              inputWidth="10rem"
              defaultValue={1}
              onChange={(newValue) => setValue(newValue)}
            />
          </div>

          <div className="prod-footer">
            <span className="footer-delete">Xóa</span>
            <span className="prod-price">519.000 Đ</span>
          </div>
        </div>
      </div>
    </CardContainer>
  );
}
