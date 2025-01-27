"use client";
import Image from "next/image";
import Link from "next/link";
//
import view from "@/assets/common/icons/view.png";
import deleted from "@/assets/common/icons/delete.png";
import styled from "styled-components";
import { roleUser } from "@/app/(home)/admin/constants/data/MenuData";

interface IProps {
    data: any[];
}

const RowContainer = styled.tr`
  border-bottom: 1px solid var(--color-gray-200);
  font-size: 1.2rem;

  &:nth-child(even){
    background-color: #faf5ff;
  }
`;

export default function RowTable({ data }: IProps) {
    return (
        <>
            {data.map((item) => (
                <RowContainer
                    key={item.id}
                >
                    <td className="flex items-center gap-4 p-4">
                        <Image
                            src={item.photo}
                            alt=""
                            width={100}
                            height={100}
                            className="md:hidden xl:block w-20 h-20 rounded-full object-cover"
                        />
                        <div className="flex flex-col">
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-xs text-gray-500">{item?.email}</p>
                        </div>
                    </td>
                    <td className="hidden md:table-cell">{item.userId}</td>
                    <td className="hidden md:table-cell">{item.subject.join(",")}</td>
                    <td className="hidden md:table-cell">{item.classes.join(",")}</td>
                    <td className="hidden md:table-cell">{item.phone}</td>
                    <td className="hidden md:table-cell">{item.address}</td>
                    <td>
                        <div className="flex items-center gap-2">
                            <Link href={`/list/teachers/${item.id}`}>
                                <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
                                    <Image src={view} alt="" width={16} height={16} />
                                </button>
                            </Link>
                            {roleUser === "admin" && (
                                <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple">
                                    <Image src={deleted} alt="" width={16} height={16} />
                                </button>
                            )}
                        </div>
                    </td>
                </RowContainer>
            ))}
        </>
    );
}
