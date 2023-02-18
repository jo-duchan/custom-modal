import { useCallback } from "react";
import styled from "styled-components";

// Modal
import { useModalContext } from "modal/ModalCore";
import { ModalType } from "type/modal-type";

// Components
import Modal from "demo/Modal";
import Toast from "demo/Toast";

function Children() {
  const modalContext = useModalContext();

  const showPopup = useCallback(() => {
    modalContext.handleShow(
      <Modal
        description="You created a modal."
        onClose={(id: string, type: ModalType) =>
          modalContext.handleHide(id, type)
        }
      />,
      "POPUP"
    );
  }, []);

  const showToast = useCallback(() => {
    modalContext.handleShow(<Toast content="토스트" />, "TOAST");
  }, []);

  return (
    <Container>
      <div onClick={showPopup}>팝업</div>
      <div onClick={showToast}>토스트</div>
    </Container>
  );
}

export default Children;

const Container = styled.div`
  position: absolute;
  left: 0;
  z-index: 99999999;
  width: 500px;
  height: 100%;
  color: red;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;
