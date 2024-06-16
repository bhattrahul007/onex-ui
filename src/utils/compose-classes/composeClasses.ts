export function composeClasses<ClassKey extends string>(
  slots: Record<ClassKey, ReadonlyArray<string | false | undefined | null>>,
  getUtilityClass: (slot: string) => string,
  classes: Record<string, string> | undefined = undefined
): Record<ClassKey, string> {
  const result: Record<ClassKey, string> = {} as any;

  Object.keys(slots).forEach(
    // @ts-ignore
    (slot: ClassKey) => {
      result[slot] = slots[slot]
        .reduce((acc, key) => {
          if (key) {
            const utilityClass = getUtilityClass(key);
            if (utilityClass !== '') acc.push(utilityClass);

            if (classes && classes[key]) {
              acc.push(classes[key]);
            }
          }
          return acc;
        }, [] as string[])
        .join(' ');
    }
  );

  return result;
}
