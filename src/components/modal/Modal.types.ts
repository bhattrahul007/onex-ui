import React from 'react';

export type ModalCloseEvent = {
  event: MouseEvent | KeyboardEvent;
  reason: 'escape-keydown' | 'close-clicked' | 'backdrop-clicked';
};

export interface ModalProps {
  children?: React.ReactNode;

  disablePortal?: boolean;
  keepMounted?: boolean;
  container?: HTMLElement;

  open?: boolean;
  hideBackdrop?: boolean;
  disableFocusRestore?: boolean;
  disableRestoreFocusOnClose?: boolean;
  disableEscapeKeyClose?: boolean;
  onClose: (info: ModalCloseEvent) => void;
  onEscapeKeyDown: (info: ModalCloseEvent) => void;
}

export interface ModalOwnerState extends ModalProps {
  keepMounted?: boolean;
  hideBackdrop?: boolean;
  disableFocusRestore?: boolean;
  disableRestoreFocusOnClose?: boolean;
  disableEscapeKeyClose?: boolean;
}
