"use client";

import { useState } from "react";
import styled from "styled-components";

const ListInfoContainer = styled.div`
  margin: 1rem 0;
  .info-title {
    margin-bottom: 2rem;
    font-size: 2rem;
    font-weight: 600;
  }

  .box-table {
    overflow-x: auto;
  }

  .custom-table {
    width: 100%;
    border-collapse: collapse;
  }

  .custom-table th,
  .custom-table td {
    padding: 5px;
    border: 1px solid #ddd;
    text-align: left;
  }

  .custom-table th {
    width: 40%;
    font-size: 1.4rem;
    padding: 8px;
    color: var(--color-gray-500);
  }

  .custom-table td {
    width: 60%;
    font-size: 1.4rem;
    color: var(--color-gray-500);
  }

  .custom-table tfoot td {
    text-align: center;
    font-weight: 600;
  }

  /* Chỉnh lại view-more */
  .view-more {
    color: var(--color-background-global);
    font-size: 1.4rem;
    text-decoration: underline;
    cursor: pointer;
  }
`;

export default function ListInfoProduct() {
  const [isSeeMore, setIsSeeMore] = useState<boolean>(false);
  return (
    <ListInfoContainer>
      <h1 className="info-title">Thông tin sản phẩm</h1>

      <div className="box-table">
        <table className="custom-table">
          <tbody>
            <tr>
              <th colSpan={2}>Chủ đề</th>
            </tr>
            <tr>
              <th>Xuất xứ</th>
              <td>Trung Quốc</td>
            </tr>
            <tr>
              <th>Mã VT</th>
              <td></td>
            </tr>
            <tr>
              <th>Tuổi</th>
              <td>7 tuổi trở lên</td>
            </tr>
            <tr>
              <th>Thương hiệu</th>
              <td>LEGO NINJAGO</td>
            </tr>
            <tr>
              <th>Xuất xứ thương hiệu</th>
              <td>Đan Mạch</td>
            </tr>
            {
              isSeeMore && (
                <tr>
                  <th>Giới tính</th>
                  <td>Nam</td>
                </tr>
              )
            }
          </tbody>

          <tfoot>
            <tr>
              <td colSpan={2}>
                <span onClick={() => setIsSeeMore(!isSeeMore)} className="view-more">{isSeeMore ? "Thu gọn" : "Xem thêm"}</span>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </ListInfoContainer>
  );
}
