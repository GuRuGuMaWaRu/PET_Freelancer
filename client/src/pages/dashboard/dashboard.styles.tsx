import styled from "@emotion/styled";
import { mq } from "shared/const";

const SContainer = styled.div`
    position: relative;
    margin: 4rem 10px;
    maxWidth: 1000px;
    height: 400px;
    ${mq.medium}: {
      max-width: 100%;
    },
`;

export { SContainer };
