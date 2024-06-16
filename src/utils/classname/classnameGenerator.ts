export const defaultGenerator = (componentName: string) => componentName;

function createClassnameGenerator() {
  let generator = defaultGenerator;

  return {
    configure(_gen: typeof generator) {
      generator = _gen;
    },

    generate(componentName: string) {
      return generator(componentName);
    },

    reset() {
      generator = defaultGenerator;
    },
  };
}

export const classnameGenerator = createClassnameGenerator();
