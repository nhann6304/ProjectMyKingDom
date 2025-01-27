"use client";
import Image from "next/image";
import moreDark from "@/assets/common/icons/moreDark.png";
import {
    ResponsiveContainer,
    LineChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Line,
} from "recharts";
import styled from "styled-components";

const FinanceChartStyled = styled.div`
  background-color: #fff;
  border-radius: var(--border-radius);
  width: 100%;
  height: calc(100% - 2rem);
  padding: 1rem;
  .chart-title {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
      font-size: 1.6rem;
      font-weight: 600;
    }
  }

  .div {
    width: 100%;
    height: 40rem;
    min-height: 100%;
  }
`;

export default function FinanceChart() {
    const data = [
        {
            name: "Jan",
            icome: 4000,
            expense: 2400,
            amt: 2400,
        },
        {
            name: "Feb",
            icome: 3000,
            expense: 1398,
            amt: 2210,
        },
        {
            name: "Mar",
            icome: 2000,
            expense: 9800,
            amt: 2290,
        },
        {
            name: "Apr",
            icome: 2000,
            expense: 9800,
            amt: 2290,
        },
        {
            name: "Jul",
            icome: 2000,
            expense: 9800,
            amt: 2290,
        },
        {
            name: "Aug",
            icome: 2000,
            expense: 9800,
            amt: 2290,
        },
        {
            name: "Sep",
            icome: 2000,
            expense: 9800,
            amt: 2290,
        },
        {
            name: "Oct",
            icome: 2000,
            expense: 9800,
            amt: 2290,
        },
        {
            name: "Dec",
            icome: 2000,
            expense: 9800,
            amt: 2290,
        },
    ];
    return (
        <FinanceChartStyled>
            <div className="chart-title">
                <h1 className="text-lg font-semibold">Students</h1>
                <Image src={moreDark} alt="moreDark" width={20} height={20} />
            </div>
            <div className="div">
                <ResponsiveContainer width="100%" height="90%">
                    <LineChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tick={{ fill: "#d1d5db", fontSize: "1.2rem", fontWeight: 500 }}
                            tickLine={false}
                            tickMargin={10}
                        />
                        <YAxis
                            axisLine={false}
                            tick={{ fill: "#d1d5db", fontSize: "1.2rem", fontWeight: 500 }}
                            tickLine={false}
                            tickMargin={20}
                        />
                        <Tooltip />
                        <Legend
                            align="center"
                            verticalAlign="top"
                            wrapperStyle={{
                                padding: "2rem",
                                fontSize: "1.6rem",
                                textTransform: "capitalize",
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="icome"
                            stroke="#8884d8"
                            strokeWidth={5}
                        />
                        <Line
                            type="monotone"
                            dataKey="amt"
                            stroke="#82ca9d"
                            strokeWidth={5}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </FinanceChartStyled>
    );
}
