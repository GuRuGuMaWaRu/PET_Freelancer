import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Filter from "./Filter";
import { toggleFilter } from "../../reducers/filtersSlice";
import { StyledFilterList, StyledCancelAllBtn } from "../styles/filter.styles";

const CancelButton = () => {
  return (
    <StyledCancelAllBtn>
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

  console.log(isFilterSelected);
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
