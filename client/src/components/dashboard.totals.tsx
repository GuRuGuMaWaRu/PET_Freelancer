/** @jsxImportSource @emotion/react */
import React from "react";

import * as colors from "../styles/colors";
import { IEarnings, formatUSD } from "../utils";

interface IProps {
  data: IEarnings[];
}

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

function DashboardTotals({ data }: IProps) {
  const earningsForThisMonth = getEarningsForThisMonth(data);
  const earningsForThisYear = getEarningsForThisYear(data);

  return (
    <div
      css={{
        display: "grid",
        gridTemplateColumns: "minmax(100px, 500px) minmax(100px, 500px)",
        gridGap: "1rem",
      }}
    >
      <div>
        <div css={{ fontSize: "2rem", fontWeight: "bold", opacity: 0.7 }}>
          {new Date()
            .toLocaleDateString("default", {
              month: "long",
            })
            .toUpperCase()}
        </div>
        <div css={{ display: "grid", gridTemplateColumns: "auto 1fr" }}>
          <span css={{ marginTop: ".9rem", marginRight: ".3rem" }}>$</span>{" "}
          <span
            css={{
              color: colors.primary,
              fontSize: "4rem",
              fontWeight: "bold",
            }}
          >
            {earningsForThisMonth}
          </span>
        </div>
      </div>
      <div>
        <div css={{ fontSize: "2rem", fontWeight: "bold", opacity: 0.7 }}>
          {new Date().getFullYear()}
        </div>
        <div css={{ display: "flex" }}>
          <span css={{ marginTop: ".9rem", marginRight: ".3rem" }}>$</span>{" "}
          <span
            css={{
              color: colors.primary,
              fontSize: "4rem",
              fontWeight: "bold",
            }}
          >
            {earningsForThisYear}
          </span>
        </div>
      </div>
    </div>
  );
}

export const MemoDashboardTotals = React.memo(DashboardTotals);
