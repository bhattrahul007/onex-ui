import { setRef } from './../set-ref';
import React from 'react';

export function useForkRef<Instance>(
  ...refs: Array<React.Ref<Instance> | undefined | null>
): React.RefCallback<Instance> | null {
  return React.useMemo(() => {
    if (refs.every((ref) => ref == null)) {
      return null;
    }

    return (instance) => {
      refs.forEach((ref) => setRef(ref, instance));
    };
  }, refs);
}
