import styled from "styled-components";
// Modal
import { useModalContext } from "modal/ModalCore";
import Modal from "modal/Modal";

function Children() {
  const modalContext = useModalContext();
  return (
    <Container>
      <div
        onClick={() => {
          const id: string = modalContext.handleShow({
            element: (
              <Modal
                description="You created a modal."
                onClose={() => modalContext.handleHide(id)}
              />
            ),
            type: "TOAST",
          });

          console.log(id, "ID Check");
        }}
      >
        버튼
      </div>
    </Container>
  );
}

export default Children;

const Container = styled.div`
  position: absolute;
  z-index: 99999;
  color: red;
  display: flex;
`;
