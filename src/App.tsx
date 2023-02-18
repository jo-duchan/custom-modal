import React from "react";
import styled from "styled-components";
import Demo from "demo/Demo";

// Modal
import { ModalProvider } from "modal/ModalCore";

// Style
import { GlobalStyle } from "style/common";

function App() {
  return (
    <Container>
      <ModalProvider>
        <GlobalStyle />
        <Demo />
      </ModalProvider>
    </Container>
  );
}

export default App;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
