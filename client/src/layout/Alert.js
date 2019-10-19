import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Alert = ({ message }) => {
  return <div>{message}</div>;
};

Alert.propTypes = {
  message: PropTypes.string.isRequired
};

export default Alert;
