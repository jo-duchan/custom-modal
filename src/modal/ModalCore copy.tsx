import React, { useContext, useCallback } from "react";

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
  const handleAddModal = useCallback((modalNode: ModalStack) => {}, []);

  const handleRemoveModal = useCallback((targetId: string) => {}, []);

  const modalContext = {
    handleShow: (id: string, element: React.ReactNode) =>
      handleAddModal({ id, element }),
    handleHide: (id: string) => handleRemoveModal(id),
  };

  return (
    <ModalContext.Provider value={modalContext}>
      {children}
    </ModalContext.Provider>
  );
}

const useModalContext: () => ModalContextType = (): ModalContextType =>
  useContext(ModalContext);

export { ModalProvider, useModalContext };
