import React from "react";
import styled from "styled-components";
import Children from "Children";

// Modal
import { ModalProvider } from "modal/ModalCore";

// Style
import { GlobalStyle } from "style/common";

function App() {
  return (
    <Container>
      <ModalProvider>
        <GlobalStyle />
        <Children />
      </ModalProvider>
    </Container>
  );
}

export default App;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;
