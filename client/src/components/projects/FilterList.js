import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Filter from "./Filter";
import { toggleFilter, cancelAllFilters } from "../../reducers/filtersSlice";
import { StyledFilterList, StyledCancelAllBtn } from "../styles/filter.styles";

const CancelButton = () => {
  const dispatch = useDispatch();

  return (
    <StyledCancelAllBtn onClick={() => dispatch(cancelAllFilters())}>
      <FontAwesomeIcon icon="times" />
    </StyledCancelAllBtn>
  );
};

const FilterList = () => {
  const filterableProps = useSelector(state => state.filters);
  const dispatch = useDispatch();

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
