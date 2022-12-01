/** @jsxImportSource @emotion/react */

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";

import { IEarningsByMonth } from "../utils";
import * as colors from "../styles/colors";

interface IProps {
  data: IEarningsByMonth[];
}

const formatterUSD = new Intl.NumberFormat("en-US");

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload: any;
}) {
  if (active && payload && payload.length) {
    return (
      <div
        css={{
          background: "white",
          opacity: 0.6,
          color: colors.textDark,
          boxShadow: "0 3px 14px rgb(0 0 0 / 40%)",
          padding: "1px",
          textAlign: "left",
          border: 0,
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
          <p>
            <span css={{ fontWeight: 600 }}># of projects:</span>
            {payload[0].payload.projects}
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
      <ResponsiveContainer width={"100%"} height={500} min-width={300}>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 30,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            stroke={colors.text2}
            tickFormatter={(unixTime) => dayjs(unixTime).format("MM/YYYY")}
            tickMargin={10}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            dataKey="payment"
            stroke={colors.text2}
            tickMargin={10}
            width={80}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => formatterUSD.format(value)}
          />
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
