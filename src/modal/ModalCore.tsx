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
        <div key={modal.id}>
          <Dimmed>{modal.element}</Dimmed>
        </div>
      ))}
      {children}
    </ModalContext.Provider>
  );
}

const useModalContext: () => ModalContextType = (): ModalContextType =>
  useContext(ModalContext);

export { ModalProvider, useModalContext };

const Dimmed = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  background: rgba(0, 0, 0, 0.3);
`;
