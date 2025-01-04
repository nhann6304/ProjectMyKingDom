"use client"
import { useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./style.scss"
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece]

export default function EventCalendar() {
    const [value, setValue] = useState<Value>(new Date())
    return (
        // <div className="bg-white p-4 rounded-md">
        <div className="container-calendar">
            <Calendar onChange={setValue} />
        </div>
    )
}
