import SearchTable from "@/app/components/tables/search-tables/SearchTable";
import "./style.scss";
import Image from "next/image";
import filter from "@/app/assets/common/icons/filter.png";
import sort from "@/app/assets/common/icons/sort.png";
import plus from "@/app/assets/common/icons/plus.png";
import PaginationAdmin from "@/app/components/pagination/pagination-admin/PaginationAdmin";
export default function ListUsersLayout() {
    return (
        <div className="list-user-container">
            {/* TOP */}
            <div className="box-top">
                <h1>All user</h1>
                <div className="box-top-search">
                    <SearchTable />
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
            <div className=""></div>
            {/* PAGINATION */}
            <PaginationAdmin />
        </div>
    );
}
