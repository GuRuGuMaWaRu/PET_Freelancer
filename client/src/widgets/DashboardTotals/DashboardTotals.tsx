/** @jsxImportSource @emotion/react */
import React from "react";

import { STotalsWrapper } from "./DashboardTotals.styles";
import {
  getEarningsForThisMonth,
  getEarningsForThisYear,
} from "./DashboardTotals.helpers";
import { IEarnings } from "shared/types";
import { EarningsByDate } from "entities/earningsByDate";

interface IProps {
  data: IEarnings[];
}

function DashboardTotals({ data }: IProps) {
  const earningsForThisMonth = getEarningsForThisMonth(data);
  const earningsForThisYear = getEarningsForThisYear(data);

  const month = new Date()
    .toLocaleDateString("default", { month: "long" })
    .toUpperCase();
  const year = new Date().getFullYear().toString();

  return (
    <STotalsWrapper>
      <EarningsByDate date={month} amount={earningsForThisMonth} />
      <EarningsByDate date={year} amount={earningsForThisYear} />
    </STotalsWrapper>
  );
}

export const MemoDashboardTotals = React.memo(DashboardTotals);
