import { generateUtilityClasses } from '../../utils/generate-utility-classes';
import { generateUtilityClass } from '../../utils/generate-utility-class';

export const MODAL_COMPONENT_NAME = 'OnexModal';

export function getModalUtilityClass(slot: string) {
  return generateUtilityClass(MODAL_COMPONENT_NAME, slot);
}

export const modalClasses = generateUtilityClasses(MODAL_COMPONENT_NAME, ['root', 'hidden', 'backdrop']);
