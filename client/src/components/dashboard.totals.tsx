/** @jsxImportSource @emotion/react */

import React from "react";
import * as colors from "../styles/colors";

interface IProps {
  earningsForThisMonth: string;
  earningsForThisYear: string;
}

function DashboardTotals({
  earningsForThisMonth,
  earningsForThisYear,
}: IProps) {
  return (
    <div
      css={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        marginTop: "1rem",
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
