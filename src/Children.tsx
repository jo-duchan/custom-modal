// Modal
import { useModalContext } from "modal/ModalCore";
import ModalContent from "modal/ModalContent";

function Children() {
  const modalContext = useModalContext();
  return (
    <>
      <div
        onClick={() => {
          modalContext.handleShow(
            "팝업1",
            <ModalContent
              description="You created a modal."
              onClose={() => modalContext.handleHide("팝업1")}
            />
          );
        }}
      >
        버튼
      </div>
      <div
        onClick={() => {
          modalContext.handleHide("팝업1");
        }}
      >
        취소
      </div>
    </>
  );
}

export default Children;
