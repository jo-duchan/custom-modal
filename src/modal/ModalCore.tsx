import React, { useContext, useCallback, useState } from "react";
import styled from "styled-components";

type ModalContextType = {
  handleShow: (id: string, element: React.ReactNode) => void;
  handleHide: (id: string) => void;
};

type ModalStack = {
  id: string;
  element: React.ReactNode;
};

const ModalContext = React.createContext<ModalContextType>(
  {} as ModalContextType
);

function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modalStacks, setModalStacks] = useState<ModalStack[]>([]);

  const handleAddModal = useCallback((modalNode: ModalStack) => {
    setModalStacks((prevStates: ModalStack[]) => [...prevStates, modalNode]);
  }, []);

  const handleRemoveModal = useCallback((targetId: string) => {
    setModalStacks((prevStates: any) =>
      prevStates.filter(({ id }: any) => id !== targetId)
    );
  }, []);

  const modalContext = {
    handleShow: (id: string, element: React.ReactNode) =>
      handleAddModal({ id, element }),
    handleHide: (id: string) => handleRemoveModal(id),
  };

  return (
    <ModalContext.Provider value={modalContext}>
      {modalStacks.map((modal: ModalStack) => (
        <div key={modal.id} onClick={() => handleRemoveModal(modal.id)}>
          {modal.element}
        </div>
      ))}
      {children}
    </ModalContext.Provider>
  );
}

const useModalContext: () => ModalContextType = (): ModalContextType =>
  useContext(ModalContext);

export { ModalProvider, useModalContext };
