import React from "react";

import Filter from "./Filter";
import { StyledFilterList } from "../styles/filter.styles";

const filters = ["unpaid"];

const FilterList = () => {
  return (
    <StyledFilterList>
      {filters.map((filter, i) => (
        <Filter key={i} filter={filter} />
      ))}
    </StyledFilterList>
  );
};

export default FilterList;
