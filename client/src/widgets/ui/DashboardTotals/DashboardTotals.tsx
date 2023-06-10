/** @jsxImportSource @emotion/react */
import React from "react";

import {
  STotalsWrapper,
  SDate,
  SSumContainer,
  SCurrencySymbol,
  SSum,
} from "./DashboardTotals.styles";
import {
  getEarningsForThisMonth,
  getEarningsForThisYear,
} from "./DashboardTotals.helpers";
import { IEarnings } from "shared/types";

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
      <div>
        <SDate>{month}</SDate>
        <SSumContainer>
          <SCurrencySymbol>$</SCurrencySymbol>{" "}
          <SSum>{earningsForThisMonth}</SSum>
        </SSumContainer>
      </div>
      <div>
        <SDate>{year}</SDate>
        <SSumContainer>
          <SCurrencySymbol>$</SCurrencySymbol>{" "}
          <SSum>{earningsForThisYear}</SSum>
        </SSumContainer>
      </div>
    </STotalsWrapper>
  );
}

export const MemoDashboardTotals = React.memo(DashboardTotals);
