import styled from "styled-components";

export const StyledModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  z-index: 100;
  opacity: 1;
  transition: all 0.5s;
`;

export const StyledTitleBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px; /* helps with container 100% height */
  color: ${props => props.theme.text};
  background-color: ${props => props.theme.darkPrimary};
  position: sticky;
  top: 0;
`;

export const StyledH1 = styled.h1`
  padding: 0.8rem 0;
  margin: 0;
`;

export const StyledContainer = styled.div`
  min-height: calc(
    100vh - 80px
  ); /* set 100% height considering header 80px height */
  margin: 0 10%;
  color: ${props => props.theme.primaryText};
  background-color: ${props => props.theme.container};
`;
