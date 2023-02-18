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
  position: absolute;
  /* 임시 데모 사이트 */
  width: calc(100% - 500px);
  right: 0;
  height: 100%;
  /* 임시 데모 사이트 */
  background: ${(props) => props.background && "rgba(0, 0, 0, 0.3)"};
`;
