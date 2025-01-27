import BigCalendar from "@/components/calendars/big-calendar/BigCalendar";
import EventCalendar from "@/components/calendars/event-calendar/EventCalendar";
import Announcements from "@/components/notifications/announcements/Announcements";
import "./style.scss";


export default function UserLayout() {
    return (
        <div className="p-4 flex gap-4 flex-col xl:flex-row">
            {/* LEFT */}
            <div className="w-full xl:w-2/3">
                <div className="h-full bg-white p-4 rounded-md">
                    <h1 className="text-xl font-semibold">Schedule (4A)</h1>
                    <BigCalendar />
                </div>
            </div>
            {/* RIGHT */}
            <div className="w-full xl:w-1/3 flex flex-col gap-8">
                <EventCalendar />
                <Announcements />
            </div>
        </div>
    );
}
