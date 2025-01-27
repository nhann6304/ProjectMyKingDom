"use client";
import Image from "next/image";
import React, { PureComponent } from "react";
import {
    RadialBarChart,
    RadialBar,
    Legend,
    ResponsiveContainer,
} from "recharts";
import moreDark from "@/assets/common/icons/moreDark.png";
import { count } from "console";
import maleFemale from "@/assets/common/icons/maleFemale.png";
import "./style.scss";
const data = [
    {
        name: "Total",
        count: 106,
        fill: "white",
    },
    {
        name: "Content",
        count: 53,
        fill: "#8884d8",
    },

    {
        name: "Admin",
        count: 47,
        fill: "#83a6ed",
    },
];


export default function CountChart() {
    return (
        <div className="container-chart">
            <div className="chart-header">
                <h1>Users Kpi</h1>
                <Image src={moreDark} alt="moreDark" height={20} width={20} />
            </div>

            <div className="chart-box">
                <ResponsiveContainer>
                    <RadialBarChart
                        cx="50%"
                        cy="50%"
                        innerRadius="40%"
                        outerRadius="100%"
                        barSize={32}
                        data={data}
                    >
                        <RadialBar background dataKey="count" />
                    </RadialBarChart>
                </ResponsiveContainer>
                <Image
                    src={maleFemale}
                    alt="maleFemale"
                    width={50}
                    height={50}
                    className="image-center"
                />
            </div>


            <div className="chart-bottom">
                <div className="item">
                    <div className="circle"></div>
                    <h1 className="circle-number">1.234</h1>
                    <h2 className="circle-description">Boys (55%)</h2>
                </div>
                <div className="item">
                    <div className="circle"></div>
                    <h1 className="circle-number">1.234</h1>
                    <h2 className="circle-description">Boys (55%)</h2>
                </div>
            </div>
        </div>
    );
}
