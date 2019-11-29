import React from "react";
import styled from "styled-components";

const StyledMessage = styled.div`
  font-size: 2rem;
  text-align: center;
  padding-top: 2rem;
`;

const NotFound = () => {
  return <StyledMessage>404. Page Not Found.</StyledMessage>;
};

export default NotFound;
