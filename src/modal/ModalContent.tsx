import { close } from "inspector";
import React, { useEffect } from "react";

type ModalStack = {
  id?: string;
  element: React.ReactNode;
  type: ModalType;
  onClose?: () => void;
};

type ModalType = "POPUP" | "TOAST" | "PROGRESS";

interface Props {
  content: ModalStack;
}

function ModalContent({ content }: Props) {
  useEffect(() => {
    console.log(content.type);
    let closeTimeout: NodeJS.Timeout;
    if (content.type === "TOAST") {
      closeTimeout = setTimeout(() => {
        if (!content.onClose) return;
        content.onClose();
      }, 5000);
    }

    return () => {
      clearTimeout(closeTimeout);
    };
  }, []);
  return <>{content.element}</>;
}

export default ModalContent;
