import "antd/dist/antd.css";
import styled from "styled-components";

export const GridBodyWrapper = styled.div`
  flex-grow: 1;
`;

export const GridHeaderWrapper = styled.div`
  display: flex;
  padding: 1rem 0 1rem 0;
  flex-direction: column;
  & > div {
    align-self:flex-end;
  }
`;

export const GridWrapper = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(4, 1fr);
  padding: 1rem;

  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;

    & > div {
      margin-bottom: 1rem;
    }
  }
`;
