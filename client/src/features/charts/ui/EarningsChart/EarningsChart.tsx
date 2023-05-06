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

import { STooltipContainer, STooltipContents } from "features/charts/styles";
import { colors } from "shared/const";
import { formatDate, formatUSD } from "shared/lib";
import type { IEarningsByMonth } from "shared/types";

interface IProps {
  data: IEarningsByMonth[];
}

function EarningsChart({ data }: IProps) {
  return (
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
          tickFormatter={(date) =>
            formatDate(date, {
              year: "numeric",
              month: "numeric",
            })
          }
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
          tickFormatter={(value) => formatUSD(value)}
        />
        <Tooltip
          content={({ active, payload }) => {
            return active && payload && payload.length ? (
              <STooltipContainer>
                <STooltipContents>
                  <p>
                    <b>Date:</b>{" "}
                    {formatDate(payload[0].payload.date, {
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <p>
                    <b>Earnings:</b> ${payload[0].payload.payment}
                  </p>
                  <p>
                    <b># of projects:</b> {payload[0].payload.projects}
                  </p>
                </STooltipContents>
              </STooltipContainer>
            ) : null;
          }}
        />

        <Area
          type="monotone"
          dataKey="payment"
          stroke="#8884d8"
          fill="#8884d8"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export const MemoEarningsChart = React.memo(EarningsChart);
