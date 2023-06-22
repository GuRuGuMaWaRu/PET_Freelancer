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

import { STooltipContainer, STooltipContents } from "features/charts/styles";
import { getMaxLabelLength } from "features/charts/lib";
import { colors } from "shared/const";
import { formatUSD } from "shared/lib";
import type { IEarningsByClient } from "shared/types";

interface IProps {
  data: IEarningsByClient[];
}

function ClientsChart({ data }: IProps) {
  const longestClientName = React.useMemo(
    () => getMaxLabelLength(data),
    [data]
  );

  return (
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
          stroke={colors.textImportant}
          type="number"
          tickFormatter={(value) => formatUSD(value)}
        />
        <YAxis
          dataKey="client"
          type="category"
          stroke={colors.textImportant}
          width={longestClientName}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          content={({ active, payload }) => {
            return active && payload && payload.length ? (
              <STooltipContainer>
                <STooltipContents>
                  <p>
                    <b>Client:</b> {payload[0].payload.client}
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
            fill={colors.white}
            formatter={(value: number) => formatUSD(value)}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export const MemoClientsChart = React.memo(ClientsChart);
