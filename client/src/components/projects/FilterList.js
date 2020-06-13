import React, { useContext } from "react";

import Filter from "./Filter";
import ProjectContext from "../../context/project/projectContext";

import { StyledFilterList } from "../styles/filter.styles";

const FilterList = () => {
  const projectContext = useContext(ProjectContext);
  const { filters } = projectContext;

  return (
    <StyledFilterList>
      {filters.map(filter => (
        <Filter key={filter.name} filter={filter} />
      ))}
    </StyledFilterList>
  );
};

export default FilterList;
