"use client";

import { Cancel } from "@/assets/common/icon-public/svg/icon/iconItem";
import {
  CONST_AGE_GROUP,
  CONST_GENDER_VALUES,
} from "@/constants/values.constant";
import { EAgeGroup } from "@/enums/EAge.enum";
import { EGender } from "@/enums/EGender.enum";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";

const ListFilterContainer = styled.header`
  display: flex;
  flex-direction: column;
  .box-header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .filter-text {
      font-size: 1.5rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    .filter-deleted {
      font-size: 1.2rem;
      font-weight: 500;
    }
  }

  .box-value-filter {
    width: 100%;
    .filter-item {
      width: 100%;
      margin-top: 1rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .filter-value {
        gap: 3px;
        display: flex;
        align-items: center;
        .title {
          font-size: 1.5rem;
          font-weight: 400;
          text-align: left;
          white-space: normal;
          word-break: break-word;
          overflow-wrap: break-word;
        }

        .text {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 1.4rem;
          font-weight: 600;
          letter-spacing: normal;
          color: #222222;
          text-align: left;
          cursor: pointer;
          white-space: normal;
          word-break: break-word;
          overflow-wrap: break-word;
        }
      }
    }
  }
`;

interface IProps {
  keySearch: string[];
}

interface IValueFilter {
  key: string;
  value: string;
  urlValue: string;
}

export default function ListFilterProd({ keySearch }: IProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [result, setResult] = useState<IValueFilter[]>([]);
  //
  const keyMapping: Record<string, string> = {
    prod_agePlay: "Tuổi",
    prod_price: "Giá (Đ)",
    user_gender: "Giới Tính",
  };

  //
  useEffect(() => {
    const newResult = keySearch.flatMap((key) => {
      const values = searchParams.get(key)?.split(",") || [];
      return values.map((val) => ({
        key: keyMapping[key] || key,
        value:
          CONST_AGE_GROUP[val as EAgeGroup] ||
          CONST_GENDER_VALUES[val as EGender] ||
          val,
        urlValue: val,
      }));
    });

    setResult(newResult);
  }, [keySearch, searchParams]);
  //
  const handleDeleteItem = (val: IValueFilter, so: number) => {
    const params = new URLSearchParams(searchParams.toString());

    // Lấy giá trị key của bộ lọc đang cần xóa
    const keyFilter = keySearch.find((key) => {
      return (params.get(key)?.split(",") || []).includes(val.urlValue);
    });

    if (!keyFilter) return;

    // Lọc bỏ giá trị bị xóa
    let filterValues = params.get(keyFilter)?.split(",") || [];
    filterValues = filterValues.filter((value) => value !== val.urlValue);

    // Cập nhật URLSearchParams
    if (filterValues.length > 0) {
      params.set(keyFilter, filterValues.join(","));
    } else {
      params.delete(keyFilter);
    }
    // Cập nhật URL mà không reload trang
    router.replace(`/products/all?${params.toString()}`);
  };

  //
  return (
    <ListFilterContainer>
      <div className="box-header">
        <span className="filter-text">Lọc theo</span>
        <span className="filter-deleted">Xóa tất cả</span>
      </div>

      <div className="box-value-filter">
        {result?.map((val, index) => (
          <div
            key={index}
            className="filter-item"
            onClick={() => handleDeleteItem(val, index)}
          >
            <div className="filter-value">
              <span className="title">{val.key}:</span>
              <span className="text">{val.value}</span>
            </div>

            <span className="filter-icon">
              <Cancel />
            </span>
          </div>
        ))}
      </div>
    </ListFilterContainer>
  );
}
