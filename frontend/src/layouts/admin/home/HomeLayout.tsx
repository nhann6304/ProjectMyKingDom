import EventCalendar from "@/components/calendars/event-calendar/EventCalendar";
import UserCard from "@/components/cards/CardUser";
import AttendanceChart from "@/components/charts/attendance-charts/AttendanceChart";
import CountChart from "@/components/charts/count-charts/CountChart";
import FinanceChart from "@/components/charts/finance-charts/FinanceChart";
import Announcements from "@/components/notifications/announcements/Announcements";
import "./style.scss";


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
                        <CountChart />

                    </div>
                    {/* ATTENDANCE CHART */}
                    <div className="chart-attendance">
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
                <Announcements />
            </div>
        </div>
    );
}
