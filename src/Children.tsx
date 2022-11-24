// Modal
import { useModalContext } from "modal/ModalCore";
import Modal from "modal/Modal";

function Children() {
  const modalContext = useModalContext();
  return (
    <>
      <div
        onClick={() => {
          const id: string = modalContext.handleShow(
            <Modal
              description="You created a modal."
              onClose={() => modalContext.handleHide(id)}
            />
          );

          console.log(id, "ID Check");
        }}
      >
        버튼
      </div>
      <div
        onClick={() => {
          // modalContext.handleHide("팝업1");
        }}
      >
        취소
      </div>
    </>
  );
}

export default Children;
