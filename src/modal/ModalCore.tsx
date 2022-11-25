import React, { useContext, useCallback, useState, useMemo } from "react";
import styled from "styled-components";
import {
  ModalContextType,
  ModalStack,
  ModalType,
  ModalElement,
} from "type/modal-type";
import ModalContainer from "modal/ModalContainer";

const ModalContext = React.createContext<ModalContextType>(
  {} as ModalContextType
);

function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modalStacks, setModalStacks] = useState<ModalStack[]>([]);

  const handleAddModal = useCallback(
    (modalNode: ModalElement, type: ModalType) => {
      const id: string = Math.random().toString();

      setModalStacks((prevStates: ModalStack[]) => [
        ...prevStates,
        { id, element: modalNode, type, fadeOut: false },
      ]);

      return id;
    },
    []
  );

  const handleRemoveModal = useCallback(
    (targetId: string, type?: ModalType) => {
      const remove = () => {
        setModalStacks((prevStates: ModalStack[]) =>
          prevStates.filter(({ id }: ModalStack) => id !== targetId)
        );
      };
      if (type === "MENU" || type === "TOAST") {
        setModalStacks((prevStates: ModalStack[]) =>
          prevStates.map((prevStates) =>
            prevStates.id === targetId
              ? { ...prevStates, fadeOut: true }
              : prevStates
          )
        );

        setTimeout(() => remove(), 300);
        return;
      }

      remove();
    },
    []
  );

  const modalContext = useMemo(() => {
    return {
      handleShow: (element: ModalElement, type: ModalType) =>
        handleAddModal(element, type),
      handleHide: (id: string, type?: ModalType) => handleRemoveModal(id, type),
    };
  }, [handleAddModal, handleRemoveModal]);

  const renderModal = useCallback(() => {
    if (modalStacks.length === 0) {
      return <> </>;
    }

    return (
      <Outside>
        {modalStacks.map((modal: ModalStack) => (
          <ModalContainer key={modal.id} content={modal} />
        ))}
      </Outside>
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

const Outside = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  z-index: 999999;
`;
