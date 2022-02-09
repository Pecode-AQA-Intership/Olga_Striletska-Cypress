const sortNumbersASC = (array) => array.sort((a, b) => a - b);

const sortStringsASC = (array) =>
  array.sort((currentValue, nextValue) => {
    const currentValueUpper = currentValue.toUpperCase();
    const nextValueUpper = nextValue.toUpperCase();
    if (currentValueUpper > nextValueUpper) {
      return 1;
    }
    if (currentValueUpper < nextValueUpper) {
      return -1;
    }
    return 0;
  });

const sortNumbersDESC = (array) => array.sort((a, b) => b - a);

const sortStringsDESC = (array) =>
  array.sort((a, b) => {
    const aUpper = a.toUpperCase();
    const bUpper = b.toUpperCase();
    if (aUpper > bUpper) {
      return -1;
    }
    if (aUpper < bUpper) {
      return 1;
    }
    return 0;
  });

export { sortNumbersASC, sortStringsASC, sortNumbersDESC, sortStringsDESC };
