const { isFunction } = require("../../utils");
const invertCondition = require("../invertCondition");

const not = argsOrFn => {
  if (isFunction(argsOrFn)) {
    const fn = argsOrFn;
    return (...args) => invertCondition(fn(...args));
  } else {
    const args = argsOrFn;
    return invertCondition(args);
  }
};

module.exports = not;
