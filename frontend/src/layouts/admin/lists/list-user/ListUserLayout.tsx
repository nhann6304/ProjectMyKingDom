"use client"
import { userData } from "@/app/(home)/admin/constants/data/MenuData";
import InputSearch from "@/components/inputs/input-search";
import PaginationAdmin from "@/components/pagination/pagination-admin/PaginationAdmin";
import ListTable from "@/components/tables/list-tables/TableData";
import "./style.scss";
import Image from "next/image";

import filter from "@/assets/common/icons/filter.png"
import sort from "@/assets/common/icons/sort.png"
import plus from "@/assets/common/icons/plus.png"



const columns = [
    {
        header: "Info",
        accessor: "info",
    },
    {
        header: "User ID",
        accessor: "userId",
        className: "hidden md:table-cell",
    },
    {
        header: "Subjects",
        accessor: "userId",
        className: "hidden md:table-cell",
    },
    {
        header: "Phone",
        accessor: "phone",
        className: "hidden md:table-cell",
    },
    {
        header: "Actions",
        accessor: "action",
    },
];

type UserType = {
    id: number;
    userId: string;
    name: string;
    email: string;
    photo: string;
    phone: string;
    subject: string[]; // Mảng chuỗi
    classes: string[]; // Mảng chuỗi
    address: string;
};

export default function ListUsersLayout() {
    return (
        <div className="list-user-container">
            {/* TOP */}
            <div className="box-top">
                <h1>All user</h1>
                <div className="box-top-search">
                    <InputSearch />
                    <div className="search-item">
                        <button>
                            <Image src={filter} alt="filter" width={16} height={16} />
                        </button>

                        <button>
                            <Image src={sort} alt="sort" width={16} height={16} />
                        </button>

                        <button>
                            <Image src={plus} alt="plus" width={16} height={16} />
                        </button>
                    </div>
                </div>
            </div>
            {/* LIST */}
            {/* <div className=""></div> */}
            <ListTable columns={columns} data={userData} />
            {/* PAGINATION */}
            <PaginationAdmin />
        </div>
    );
}
