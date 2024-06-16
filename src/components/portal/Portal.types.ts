import React from 'react';

export interface PortalProps {
  children?: React.ReactNode;

  container: Element | (() => Element | null) | null;

  disablePortal?: boolean;
}
