import { generateUtilityClass } from '../generate-utility-class';

export function generateUtilityClasses(componentName: string, slots: string[]) {
  const output: Record<string, string> = {};
  slots.forEach((slot) => {
    output[slot] = generateUtilityClass(componentName, slot);
  });
  return output;
}
