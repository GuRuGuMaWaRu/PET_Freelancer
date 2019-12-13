import React from "react";
import spinner from "./ajax-loader.gif";
import styled from "styled-components";

const StyledImg = styled.img`
  display: block;
  width: 50px;
  padding-top: 100px;
  margin: auto;
`;

const Spinner = () => <StyledImg src={spinner} alt="Loading..." />;

export default Spinner;
