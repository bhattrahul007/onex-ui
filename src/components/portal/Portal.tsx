import { useEnhancedEffect } from './../../hooks/use-enhanced-effect';
import React, { cloneElement, isValidElement, useState } from 'react';
import { useForkRef } from './../../hooks/use-fork-ref';
import { setRef } from './../../hooks/set-ref';
import { PortalProps } from './Portal.types';
import { createPortal } from 'react-dom';

function getcontainer(container: PortalProps['container']): Element | null {
  return typeof container === 'function' ? container() : container;
}

export const Portal = React.forwardRef(function Portal(
  inprops: PortalProps,
  forwardedRef: React.ForwardedRef<Element>
) {
  const { children, disablePortal, container } = inprops;
  const [mountNode, setMountNode] = useState<ReturnType<typeof getcontainer>>(null);
  // @ts-ignore
  const handleRef = useForkRef(isValidElement(children) ? children.ref : null, forwardedRef);

  useEnhancedEffect(() => {
    if (!disablePortal) {
      setMountNode(getcontainer(container) || document.body);
    }
  }, [container, disablePortal]);

  useEnhancedEffect(() => {
    if (mountNode && !disablePortal) {
      setRef(forwardedRef, mountNode);

      return () => {
        setRef(forwardedRef, null);
      };
    }
    return undefined;
  }, [mountNode, disablePortal, forwardedRef]);

  if (disablePortal) {
    if (isValidElement(children)) {
      const newProps = {
        ref: handleRef,
      };
      return cloneElement(children, newProps);
    }
    return <React.Fragment>{children}</React.Fragment>;
  }

  return mountNode ? createPortal(children, mountNode) : mountNode;
});
