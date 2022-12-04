/** @jsxImportSource @emotion/react */

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LabelList,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { IEarningsByClient, formatUSD } from "../utils";
import * as colors from "../styles/colors";

interface IProps {
  data: IEarningsByClient[];
}

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
            <span css={{ fontWeight: 600 }}>Client:</span>{" "}
            {payload[0].payload.client}
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

function ClientsChart({ data }: IProps) {
  return (
    <>
      <h2>Earnings by Clients</h2>
      <ResponsiveContainer width="100%" height={40 * data.length}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{
            top: 10,
            right: 30,
            left: 30,
            bottom: 30,
          }}
        >
          <XAxis
            dataKey="payment"
            stroke={colors.text2}
            type="number"
            tickFormatter={(value) => formatUSD(value)}
          />
          <YAxis
            dataKey="client"
            type="category"
            stroke={colors.text2}
            width={200}
            tickFormatter={(value) => value.toLocaleString()}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip payload={data} />} />
          <Bar
            type="monotone"
            dataKey="payment"
            minPointSize={30}
            stroke="#8884d8"
            fill="#8884d8"
          >
            <LabelList
              dataKey="payment"
              position="inside"
              fill={colors.text}
              formatter={(value: number) => formatUSD(value)}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}

export const MemoClientsChart = React.memo(ClientsChart);
