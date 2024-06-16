import { classnameGenerator } from './../classname';

const globalActiveState = {
  open: 'open',
  closed: 'closed',
  active: 'active',
  focused: 'focused',
  checked: 'checked',
  selected: 'selected',
  disabled: 'disabled',
  expanded: 'expanded',
  collapsed: 'collapsed',
  focusVisible: 'focusVisible',
  error: 'error',
  required: 'required',
  readonly: 'readonly',
};

export type GlobalStateSlot = keyof typeof globalActiveState;

export function generateUtilityClass(
  componentName: string,
  slot: string,
  globalStatePrefix: string = 'Onex'
) {
  let globalStateClass: string = undefined as any;
  if (isGlobalState(slot)) {
    globalStateClass = globalActiveState[slot as GlobalStateSlot];
  }
  return globalStateClass
    ? `${globalStatePrefix}-${globalStateClass}`
    : `${classnameGenerator.generate(componentName)}-${slot}`;
}

export function isGlobalState(slot: string) {
  return slot in globalActiveState;
}
