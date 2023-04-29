/** @jsxImportSource @emotion/react */
import React from "react";

import { colors } from "shared/const";
import { formatUSD } from "shared/lib";
import type { IEarnings } from "utils";

const getEarningsForThisMonth = (data: IEarnings[]): string => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;

  const earnings = data.find((item) => item.id === `${year}-${month}`);

  return formatUSD(earnings?.payment ? earnings.payment / 1000 : 0);
};

const getEarningsForThisYear = (data: IEarnings[]): string => {
  const year = new Date().getFullYear();

  const total = data.reduce((acc, item) => {
    if (item.date.getFullYear() === year) {
      return acc + item.payment;
    }
    return acc;
  }, 0);

  return formatUSD(total !== 0 ? total / 1000 : 0);
};

interface ITotalsProps {
  date: string;
  amount: string;
}

function Totals({ date, amount }: ITotalsProps) {
  return (
    <div>
      <div
        css={{
          fontSize: "clamp(1.5rem, 3.5vw, 2.8rem)",
          fontWeight: "bold",
          opacity: 0.7,
        }}
      >
        {date}
      </div>
      <div css={{ display: "grid", gridTemplateColumns: "auto 1fr" }}>
        <span css={{ marginTop: ".9rem", marginRight: ".3rem" }}>$</span>{" "}
        <span
          css={{
            color: colors.primary,
            fontSize: "clamp(2rem, 5vw, 4.5rem)",
            fontWeight: "bold",
          }}
        >
          {amount}
        </span>
      </div>
    </div>
  );
}

interface IDashboardTotalsProps {
  data: IEarnings[];
}

function DashboardTotals({ data }: IDashboardTotalsProps) {
  const earningsForThisMonth = getEarningsForThisMonth(data);
  const earningsForThisYear = getEarningsForThisYear(data);

  const month = new Date()
    .toLocaleDateString("default", { month: "long" })
    .toUpperCase();
  const year = new Date().getFullYear().toString();

  return (
    <div
      css={{
        display: "grid",
        gridTemplateColumns: "minmax(100px, 1fr) minmax(100px, 1fr)",
        gridGap: "1rem",
        marginBottom: "2rem",
      }}
    >
      <Totals date={month} amount={earningsForThisMonth} />
      <Totals date={year} amount={earningsForThisYear} />
    </div>
  );
}

export const MemoDashboardTotals = React.memo(DashboardTotals);
