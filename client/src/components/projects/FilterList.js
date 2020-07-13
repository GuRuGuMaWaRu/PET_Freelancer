import React, { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";

import Filter from "./Filter";
// import ClientContext from "../../context/client/clientContext";
import { toggleFilter } from "../../reducers/filtersSlice";

import { StyledFilterList } from "../styles/filter.styles";

const FilterList = () => {
  const filterableProps = useSelector(state => state.filters);
  const dispatch = useDispatch();

  // const clientContext = useContext(ClientContext);
  // const { toggleFilter } = clientContext;

  const renderedFilters = Object.values(filterableProps).reduce(
    (final, filters) => [...final, ...filters],
    []
  );

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
    </StyledFilterList>
  );
};

export default FilterList;
