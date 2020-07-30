import React from "react";
import PropTypes from "prop-types";

import { StyledFilterItem, StyledMarkIcon } from "../styles/filter.styles";

const Filter = ({ filter, onToggleFilter }) => {
  return (
    <StyledFilterItem onClick={onToggleFilter} selected={filter.selected}>
      {filter.selected && <StyledMarkIcon icon="check" />}
      {filter.filterName}
    </StyledFilterItem>
  );
};

Filter.propTypes = {
  filter: PropTypes.shape({
    filterName: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    status: PropTypes.any
  }),
  onToggleFilter: PropTypes.func.isRequired
};

export default Filter;
