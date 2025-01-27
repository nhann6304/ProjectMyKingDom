"use client";
import styled from "styled-components";
import InputSearch from "../../inputs/input-search";
import React from "react";
import ColumnTable from "./ColumnsTable";
import RowTable from "./RowTable";
import { IColumn } from "@/interfaces/common/ICommon.interface";

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
