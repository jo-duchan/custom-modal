import React from "react";

export type ModalElement = React.ReactElement<
  any,
  string | React.JSXElementConstructor<any>
>;

export type ModalContextType = {
  handleShow: (element: ModalElement, type: ModalType) => string;
  handleHide: (id: string, type?: ModalType) => void;
};

export type ModalStack = {
  id?: string;
  element: ModalElement;
  type: ModalType;
  fadeOut: boolean;
};

export type ModalType = "POPUP" | "TOAST" | "PROGRESS" | "MENU";
