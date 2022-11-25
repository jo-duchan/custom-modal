import React from "react";
import styled from "styled-components";
import { ModalStack } from "type/modal-type";

interface Props {
  content: ModalStack;
}

interface StyledProps {
  background: boolean;
}

function ModalContainer({ content }: Props) {
  return (
    <Container
      background={content.type === "POPUP" || content.type === "PROGRESS"}
    >
      {React.cloneElement(content.element, content)}
    </Container>
  );
}

export default ModalContainer;

const Container = styled.div<StyledProps>`
  width: 100%;
  height: 100%;
  background: ${(props) => props.background && "rgba(0, 0, 0, 0.3)"};
`;
