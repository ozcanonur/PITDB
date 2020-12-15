export const isStringArray = (test: any[]): boolean => {
  return Array.isArray(test) && !test.some((value) => typeof value !== 'string');
};

export const isNumberArray = (test: any[]): boolean => {
  return Array.isArray(test) && !test.some((value) => typeof value !== 'number');
};

export const isNumberTuple = (test: any[]): boolean => {
  if (!(test instanceof Array)) return false;

  const [first, second] = test;

  if (typeof first === 'number' && typeof second === 'number' && test.length === 2) {
    return true;
  }

  return false;
};
