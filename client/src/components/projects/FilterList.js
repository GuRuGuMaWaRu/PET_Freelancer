import React, { useContext } from "react";

import Filter from "./Filter";
import ProjectContext from "../../context/project/projectContext";

import { StyledFilterList } from "../styles/filter.styles";

const FilterList = () => {
  const projectContext = useContext(ProjectContext);
  const { filterableProps, toggleFilter } = projectContext;

  const filters = filterableProps.reduce(
    (final, property) => [...final, ...property.filters],
    []
  );

  return (
    <StyledFilterList>
      {filters.map(filter => (
        <Filter
          key={filter.filterName}
          filter={filter}
          onToggleFilter={toggleFilter.bind(null, filter.filterName)}
        />
      ))}
    </StyledFilterList>
  );
};

export default FilterList;
