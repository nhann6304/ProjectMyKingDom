"use client";
import moreDark from "@/app/assets/common/icons/moreDark.png";
import Image from "next/image";
import {
    ResponsiveContainer,
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Bar,
    Rectangle,
} from "recharts";

export default function AttendanceChart() {
    const data = [
        {
            name: "Monday",
            present: 4000,
            absent: 2400,
        },
        {
            name: "Tuesday",
            present: 3000,
            absent: 1398,
        },
        {
            name: "Wednesday",
            present: 2000,
            absent: 9800,
        },
        {
            name: "Thursday",
            present: 2780,
            absent: 3908,
        },
        {
            name: "Friday",
            present: 1890,
            absent: 4800,
        },
        {
            name: "Saturday",
            present: 2390,
            absent: 3800,
        },
        {
            name: "Sunday",
            present: 3490,
            absent: 4300,
        },
    ];

    return (
        <div className="bg-white rounded-lg p-4 h-full">
            <div className="flex justify-between items-center">
                <h1 className="text-lg font-semibold">Attendance</h1>
                <Image src={moreDark} alt="moreDark" width={20} height={20} />
            </div>
            <ResponsiveContainer width="100%" height="90%">
                <BarChart width={500} height={300} data={data} barSize={20}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
                    <XAxis
                        dataKey="name"
                        axisLine={true}
                        tick={{ fill: "#d1d5db" }}
                        tickLine={false}
                    />
                    <YAxis axisLine={true} tick={{ fill: "#d1d5db" }} tickLine={false} />
                    <Tooltip
                        contentStyle={{
                            borderRadius: "10px",
                            borderColor: "lightgray",
                            fontSize: "1.4rem",
                            fontWeight: 500,
                            textTransform: "capitalize",
                        }}
                    />
                    <Legend
                        align="left"
                        verticalAlign="top"
                        wrapperStyle={{
                            paddingTop: "20px",
                            paddingBottom: "2rem",
                            fontSize: "1.8rem",
                            textTransform: "capitalize",
                        }}
                    />
                    <Bar
                        dataKey="present"
                        fill="#8884d8"
                        activeBar={<Rectangle fill="pink" stroke="blue" />}
                        legendType="circle"
                        radius={[10, 10, 0, 0]}
                    />
                    <Bar
                        dataKey="absent"
                        fill="#82ca9d"
                        activeBar={<Rectangle fill="gold" stroke="purple" />}
                        legendType="circle"
                        radius={[10, 10, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
