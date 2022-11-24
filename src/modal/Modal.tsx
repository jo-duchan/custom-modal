import React, { useEffect } from "react";
import styled from "styled-components";

// Type
interface Props {
  description: string;
  onClose: () => void;
}

interface StyledProps {
  color: string;
  background: string;
}

function Modal({ description, onClose }: Props) {
  useEffect(() => {
    console.log("hello~");
  }, []);
  return (
    <Container>
      <InnerWrapper>
        <Description>{description}</Description>
        <ButtonWrapper>
          <Button onClick={onClose} background="#eeeeee" color="#191919">
            Close
          </Button>
          <Button background="#247EF4" color="#FFF">
            Confirm
          </Button>
        </ButtonWrapper>
      </InnerWrapper>
    </Container>
  );
}

export default Modal;

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: 320px;
  height: 200px;
  background: #fff;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999999;
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Description = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  font-size: 18px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button<StyledProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 40px;
  border-radius: 4px;
  background: ${(props) => props.background};
  color: ${(props) => props.color};
  cursor: pointer;
  user-select: none;
  &:active {
    opacity: 0.4;
  }
`;
