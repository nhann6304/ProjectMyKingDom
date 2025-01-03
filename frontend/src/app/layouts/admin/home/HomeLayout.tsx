import CardUser from "@/app/components/cards/CardUser";
import "./style.scss";
import UserCard from "@/app/components/cards/CardUser";
import CountChart from "@/app/components/charts/count-charts/CountChart";
import AttendanceChart from "@/app/components/charts/attendance-charts/AttendanceChart";

export default function AdminHomeLayout() {
    return (
        <div className="admin-layout">
            <div className="admin-layout-left">
                <div className="user-cards">
                    <UserCard type="content" />
                    <UserCard type="product" />
                    <UserCard type="admin" />
                    <UserCard type="mentor" />
                </div>

                <div className="section-chart">
                    <div className="chart-count">
                        {/* <div className="w-full lg:w-1/3 h-[450px]"> */}
                        <CountChart />
                    </div>

                    <div className="chart-attendance">
                        {/* <div className="w-full lg:w-2/3 h-[450px]"> */}
                        <AttendanceChart />
                    </div>
                </div>

                {/* MIDDLE CHARTS */}

                <div className=""></div>
            </div>

            <div className="admin-layout-right">rr</div>
        </div>
    );
}
