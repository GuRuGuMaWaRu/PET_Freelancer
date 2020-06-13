import React from "react";
import { StyledFilterItem, StyledMarkIcon } from "../styles/filter.styles";

const Filter = ({ filter }) => {
  return (
    <StyledFilterItem>
      <StyledMarkIcon icon="check" />
      {filter}
    </StyledFilterItem>
  );
};

export default Filter;
