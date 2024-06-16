import { composeClasses } from '../../utils/compose-classes';
import { getModalUtilityClass } from './ModalClasses';
import { ModalOwnerState } from './Modal.types';

const useUtilityClasses = (ownerState: ModalOwnerState) => {
  const { open } = ownerState;
  const slots = {
    root: ['root', open && 'open'],
    backdrop: ['backdrop'],
  };
  return composeClasses(slots, getModalUtilityClass);
};
