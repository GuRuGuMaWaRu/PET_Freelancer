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
import { STooltipContainer, STooltipContents } from "./dashboard.styles";
import { colors } from "../shared";

interface IProps {
  data: IEarningsByClient[];
}

const getMaxLabelLength = (data: IEarningsByClient[]): number => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d") as CanvasRenderingContext2D;
  context.font = "16px outfit";

  const clientNamesWidth = data.map((item) =>
    Math.ceil(context.measureText(item.client).width),
  );

  return Math.max(...clientNamesWidth);
};

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload: any;
}) {
  if (active && payload && payload.length) {
    return (
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
    );
  }

  return null;
}

function ClientsChart({ data }: IProps) {
  const longestClientName = React.useMemo(() => getMaxLabelLength(data), [
    data,
  ]);

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
            width={longestClientName}
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
              fill={colors.white}
              formatter={(value: number) => formatUSD(value)}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}

export const MemoClientsChart = React.memo(ClientsChart);
