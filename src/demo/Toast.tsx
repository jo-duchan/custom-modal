import React, { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { useModalContext } from "modal/ModalCore";

// STYLE
// import { Responsive } from 'styles/common';
// import { Colors } from 'styles/colors';
// import { SubTitle } from 'styles/typography';

// TYPE
interface StyledProps {
  fadeOut: boolean;
}

const TOAST_SHOW_TIME = 3000;

function Toast(props: any) {
  const modalContext = useModalContext();
  const [closing, setClosing] = useState<boolean>(false);
  const { id, type, fadeOut, content } = props;

  useEffect(() => {
    const timer = setInterval(() => {
      modalContext.handleHide(id, type);
    }, TOAST_SHOW_TIME);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (fadeOut) {
      setClosing(true);
    }
  }, [fadeOut]);

  return (
    <Container fadeOut={closing}>
      <ToastWrapper fadeOut={closing}>
        <ContentWrapper>
          <Text>{content}</Text>
        </ContentWrapper>
      </ToastWrapper>
    </Container>
  );
}

export default Toast;

const fadeIn = keyframes`
0% {
    opacity: 0;
    transform: translate3d(-50%, 100%, 0);
}
100%{
    opacity: 1;
    transform: translate3d(-50%, 0, 0);
}
`;

const fadeOut = keyframes`
0% {
    opacity: 1;
    transform: translate3d(-50%, 0, 0);
}
100%{
    opacity: 0;
}
`;

const Container = styled.div<StyledProps>`
  position: absolute;
  display: flex;
  width: auto;
  height: auto;
  left: 50%;
  bottom: 48px;
  transform: translate3d(-50%, 0, 0);
  pointer-events: none;
  ${(props) =>
    props.fadeOut
      ? css`
          animation: ${fadeOut} 250ms ease-in-out forwards;
        `
      : css`
          animation: ${fadeIn} 250ms ease-in-out forwards;
        `};
`;

const ToastWrapper = styled.div<StyledProps>``;

const ContentWrapper = styled.div`
  width: auto;
  max-width: 312px;
  height: auto;
  min-height: 40px;
  padding: 11px 29px;
  border-radius: 100vh;
  box-sizing: border-box;
  background: red;
  opacity: 0.8;
`;

const Text = styled.span`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: pre;
  overflow: hidden;
`;
