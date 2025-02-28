"use client";
import "./style.scss";
import "react-calendar/dist/Calendar.css";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import Image from "next/image";

//
import moreDark from "@/assets/common/icons/moreDark.png";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const eventsData = [
    {
        id: 1,
        title: "Lorem ipsum dolor",
        time: "12:00 PM - 2:00 PM",
        description: "Lorem ipsum dolor sit emet, consectetur adipiscing elit",
    },
    {
        id: 2,
        title: "Lorem ipsum dolor",
        time: "12:00 PM - 2:00 PM",
        description: "Lorem ipsum dolor sit emet, consectetur adipiscing elit",
    },
    {
        id: 3,
        title: "Lorem ipsum dolor",
        time: "12:00 PM - 2:00 PM",
        description: "Lorem ipsum dolor sit emet, consectetur adipiscing elit",
    },
];

export default function EventCalendar() {
    const [value, setValue] = useState<Value>(new Date());
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true); // Đánh dấu component đã render trên client
    }, []);

    if (!isMounted) return null; // Chỉ render sau khi chạy trên client

    return (
        <div className="container">
            <Calendar onChange={setValue} value={value} />
            {/* Event */}
            <div className="container-event">
                <h1>Events</h1>
                <Image src={moreDark} alt="" height={20} width={20} />
            </div>

            <div className="container-event-content">
                {eventsData.map((event) => (
                    <div className="event-top" key={event.id}>
                        <div className="box-content">
                            <h1>{event.title}</h1>
                            <span className="text-gray-300 text-xs">{event.time}</span>
                        </div>
                        <p className="content-description">{event.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
