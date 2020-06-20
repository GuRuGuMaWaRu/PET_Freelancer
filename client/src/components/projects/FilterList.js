import React, { useContext } from "react";

import Filter from "./Filter";
import ClientContext from "../../context/client/clientContext";

import { StyledFilterList } from "../styles/filter.styles";

const FilterList = () => {
  const clientContext = useContext(ClientContext);
  const { filterableProps, toggleFilter } = clientContext;

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
          onToggleFilter={toggleFilter.bind(
            null,
            filter.filterName,
            filter.propName
          )}
        />
      ))}
    </StyledFilterList>
  );
};

export default FilterList;
