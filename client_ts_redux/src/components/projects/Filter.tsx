import React from "react";

import { StyledFilterItem, StyledMarkIcon } from "../styles/filter.styles";
import type { IFilter } from "../../store/reducers/filtersSlice";

interface IProps {
  filter: IFilter;
  onToggleFilter: () => void;
}

const Filter: React.FC<IProps> = ({ filter, onToggleFilter }) => {
  return (
    <StyledFilterItem
      onClick={onToggleFilter}
      selected={filter.selected}
      native={filter.native}
    >
      {filter.selected && <StyledMarkIcon icon="check" />}
      {filter.filterName}
    </StyledFilterItem>
  );
};

export default Filter;
