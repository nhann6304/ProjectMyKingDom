"use client";
import { IColumn } from "@/interfaces/common/ICommon.interface";
import styled from "styled-components";
interface IProps {
    columns: IColumn[];
}

const TheadContainer = styled.thead`
  tr {
    font-size: 1.4rem;
    font-weight: 500;
    color: var(--color-gray-500);
    text-align: left;
  }
`;

export default function ColumnTable({ columns }: IProps) {
    return (
        <TheadContainer>
            <tr>
                {columns.map((col) => (
                    <th key={col.accessor} className={col.className}>
                        {col.header}
                    </th>
                ))}
            </tr>
        </TheadContainer>
    );
}
