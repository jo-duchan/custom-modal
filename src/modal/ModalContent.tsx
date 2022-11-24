import { close } from "inspector";
import React, { useEffect } from "react";

type ModalStack = {
  id: string;
  element: React.ReactNode;
  onClose: () => void;
};

interface Props {
  content: ModalStack;
}

function ModalContent({ content }: Props) {
  useEffect(() => {
    console.log(content);

    const closeTimeout = setTimeout(() => {
      content.onClose();
    }, 5000);

    return () => {
      clearTimeout(closeTimeout);
    };
  }, []);
  return <>{content.element}</>;
}

export default ModalContent;
