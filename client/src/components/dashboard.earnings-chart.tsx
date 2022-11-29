/** @jsxImportSource @emotion/react */

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Label,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";

interface IProps {
  data: {
    date: number;
    payment: number;
  }[];
}

function CustomTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    return (
      <div
        css={{
          background: "white",
          color: "#333",
          boxShadow: "0 3px 14px rgb(0 0 0 / 40%)",
          padding: "1px",
          textAlign: "left",
          borderRadius: "12px",
        }}
      >
        <div css={{ margin: "13px 19px" }}>
          <p>
            <span css={{ fontWeight: 600 }}>Date:</span>{" "}
            {dayjs(payload[0].payload.date).format("MMMM, YYYY")}
          </p>
          <p>
            <span css={{ fontWeight: 600 }}>Earnings:</span> $
            {payload[0].payload.payment}
          </p>
        </div>
      </div>
    );
  }

  return null;
}

function EarningsChart({ data }: IProps) {
  return (
    <>
      <h2>Earnings by Month</h2>
      <ResponsiveContainer width={"100%"} height={300} min-width={300}>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 20,
            bottom: 30,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            stroke="tomato"
            tickFormatter={(unixTime) => dayjs(unixTime).format("MM/YYYY")}
          >
            <Label value="Date" stroke="tomato" position="bottom" />
          </XAxis>
          <YAxis dataKey="payment" stroke="tomato">
            <Label
              value="Earnings"
              stroke="tomato"
              angle={-90}
              position="left"
              dy="-10"
            />
          </YAxis>
          <Tooltip content={<CustomTooltip payload={data} />} />
          <Area
            type="monotone"
            dataKey="payment"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
}

export const MemoEarningsChart = React.memo(EarningsChart);
