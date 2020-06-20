import React, { useContext } from "react";

import Filter from "./Filter";
import ProjectContext from "../../context/project/projectContext";

import { StyledFilterList } from "../styles/filter.styles";

const FilterList = () => {
  const projectContext = useContext(ProjectContext);
  const { filterableProps, toggleFilter } = projectContext;

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
