import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useAppSelector, useAppDispatch } from "../../hooks";
import { toggleFilter, cancelAllFilters } from "../../reducers/filtersSlice";
import { StyledFilterList, StyledCancelAllBtn } from "../styles/filter.styles";
import Filter from "./Filter";

const CancelButton = () => {
  const dispatch = useAppDispatch();

  return (
    <StyledCancelAllBtn onClick={() => dispatch(cancelAllFilters())}>
      <FontAwesomeIcon icon="times" />
    </StyledCancelAllBtn>
  );
};

const FilterList = () => {
  const filterableProps = useAppSelector(state => state.filters);
  const dispatch = useAppDispatch();

  const renderedFilters = Object.values(filterableProps).reduce(
    (final, filters) => [...final, ...filters],
    []
  );

  const isFilterSelected = renderedFilters.some(filter => filter.selected);

  return (
    <StyledFilterList>
      {renderedFilters.map(filter => (
        <Filter
          key={filter.filterName}
          filter={filter}
          onToggleFilter={() =>
            dispatch(
              toggleFilter({
                filterName: filter.filterName,
                propName: filter.propName
              })
            )
          }
        />
      ))}
      {isFilterSelected && <CancelButton />}
    </StyledFilterList>
  );
};

export default FilterList;
