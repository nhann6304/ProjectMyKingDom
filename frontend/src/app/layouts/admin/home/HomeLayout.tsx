import CardUser from "@/app/components/cards/CardUser";
import "./style.scss";
import UserCard from "@/app/components/cards/CardUser";
import CountChart from "@/app/components/charts/count-charts/CountChart";
import AttendanceChart from "@/app/components/charts/attendance-charts/AttendanceChart";
import FinanceChart from "@/app/components/charts/finance-charts/FinanceChart";
import EventCalendar from "@/app/components/calendars/EventCalendar";

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

                <div className="section-top-chart">
                    {/* COUNT CHART */}
                    <div className="chart-count">
                        {/* <div className="w-full lg:w-1/3 h-[450px]"> */}
                        <CountChart />
                    </div>
                    {/* ATTENDANCE CHART */}
                    <div className="chart-attendance">
                        {/* <div className="w-full lg:w-2/3 h-[450px]"> */}
                        <AttendanceChart />
                    </div>
                </div>
                {/* BOTTOM CHARTS */}
                <div className="section-bottom-chart">
                    <FinanceChart />
                </div>
            </div>

            <div className="admin-layout-right">
                <EventCalendar />
            </div>
        </div>
    );
}
