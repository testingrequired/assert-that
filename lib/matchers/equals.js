const matcher = require("../matcher");

const equals = matcher(
  (a, e) => a == e,
  (a, e) => `expected ${a} to equal ${e}`
);

equals.strict = matcher(
  (a, e) => a === e,
  (a, e) => `expected ${a} to strictly equal ${e}`
);

module.exports = equals;
