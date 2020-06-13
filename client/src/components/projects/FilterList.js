import React, { useContext } from "react";

import Filter from "./Filter";
import ProjectContext from "../../context/project/projectContext";

import { StyledFilterList } from "../styles/filter.styles";

const FilterList = () => {
  const projectContext = useContext(ProjectContext);
  const { filters, toggleFilter } = projectContext;

  return (
    <StyledFilterList>
      {filters.map(filter => (
        <Filter
          key={filter.name}
          filter={filter}
          onToggleFilter={toggleFilter.bind(null, filter.name)}
        />
      ))}
    </StyledFilterList>
  );
};

export default FilterList;
