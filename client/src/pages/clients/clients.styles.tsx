import styled from "@emotion/styled";

const ClientList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0;
  margin: 0;
`;

const ClientCard = styled.div`
  padding: 1rem;
  border: 2px solid #fff;
  border-radius: 5px;
`;

const ClientName = styled.h3`
  padding-bottom: 1rem;
`;

const ClientData = styled.div`
  display: flex;
  justify-content: space-between;
`;

export { ClientList, ClientCard, ClientName, ClientData };
