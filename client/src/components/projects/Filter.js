import React from "react";
import { StyledFilterItem, StyledMarkIcon } from "../styles/filter.styles";

const Filter = ({ filter }) => {
  return (
    <StyledFilterItem>
      {filter.selected && <StyledMarkIcon icon="check" />}
      {filter.name}
    </StyledFilterItem>
  );
};

export default Filter;
