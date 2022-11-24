import React, { useContext, useCallback, useState } from "react";
import styled from "styled-components";
import ModalContent from "modal/ModalContent";

type ModalContextType = {
  handleShow: ({ element, type }: ModalStack) => string;
  handleHide: (id: string) => void;
};

type ModalStack = {
  id?: string;
  element: React.ReactNode;
  type: ModalType;
  onClose?: () => void;
};

type ModalType = "POPUP" | "TOAST" | "PROGRESS";

const ModalContext = React.createContext<ModalContextType>(
  {} as ModalContextType
);

function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modalStacks, setModalStacks] = useState<ModalStack[]>([]);

  const handleAddModal = useCallback(
    (modalNode: React.ReactNode, type: ModalType): string => {
      const id: string = Math.random().toString();

      const onClose = () => {
        setModalStacks((prevStates: ModalStack[]) =>
          prevStates.filter((modal) => modal.id !== id)
        );
      };
      setModalStacks((prevStates: ModalStack[]) => [
        ...prevStates,
        { id: id, element: modalNode, type: type, onClose: onClose },
      ]);

      return id;
    },
    []
  );

  const handleRemoveModal = useCallback((targetId: string) => {
    setModalStacks((prevStates: ModalStack[]) =>
      prevStates.filter(({ id }: ModalStack) => id !== targetId)
    );
  }, []);

  const modalContext = {
    handleShow: ({ element, type }: ModalStack) =>
      handleAddModal(element, type),
    handleHide: (id: string) => handleRemoveModal(id),
  };

  const renderModal = useCallback(() => {
    if (modalStacks.length === 0) {
      return <></>;
    }

    return (
      <ModalContainer>
        {modalStacks.map((modal: ModalStack) => (
          <ModalContent key={modal.id} content={modal} />
          // <div key={modal.id}>{modal.element}</div>
        ))}
      </ModalContainer>
    );
  }, [modalStacks]);

  return (
    <ModalContext.Provider value={modalContext}>
      {renderModal()}
      {children}
    </ModalContext.Provider>
  );
}

const useModalContext: () => ModalContextType = (): ModalContextType =>
  useContext(ModalContext);

export { ModalProvider, useModalContext };

const ModalContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
`;
