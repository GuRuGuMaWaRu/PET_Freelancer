import React from "react";
import PropTypes from "prop-types";
import { StyledFilterItem, StyledMarkIcon } from "../styles/filter.styles";

const Filter = ({ filter, onToggleFilter }) => {
  return (
    <StyledFilterItem onClick={onToggleFilter} selected={filter.selected}>
      {filter.selected && <StyledMarkIcon icon="check" />}
      {filter.name}
    </StyledFilterItem>
  );
};

Filter.propTypes = {
  filter: PropTypes.shape({
    name: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired
  }),
  onToggleFilter: PropTypes.func.isRequired
};

export default Filter;
