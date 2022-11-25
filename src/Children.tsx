import styled from "styled-components";
// Modal
import { useModalContext } from "modal/ModalCore";
import Modal from "modal/Modal";
import { ModalType } from "type/modal-type";

function Children() {
  const modalContext = useModalContext();
  return (
    <Container>
      <div
        onClick={() => {
          modalContext.handleShow(
            <Modal
              description="You created a modal."
              onClose={(id: string, type: ModalType) =>
                modalContext.handleHide(id, type)
              }
            />,
            "POPUP"
          );
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
