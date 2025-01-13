"use client";
import styled from "styled-components";
import InputSearch from "../../inputs/input-search";
import React from "react";
import { IColumn } from "@/app/interfaces/common/ICommon.interface";
import ColumnTable from "./ColumnsTable";
import RowTable from "./RowTable";

const SearchTableContainer = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
`;

interface IProps {
  columns: IColumn[];
  data: any[];
}

export default function ListTable({ columns, data }: IProps) {
  return (
    <table className="w-full mt-4">
      {/* Column */}
      <ColumnTable columns={columns} />
      {/* Row */}
      <RowTable data={data} />
    </table>
  );
}
