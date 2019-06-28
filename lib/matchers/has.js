const matcher = require("../matcher");

const has = {};

has.item = matcher(
  (a, e) => a.includes(e),
  (a, e) => `expected ${a} to include ${e}`
);

has.items = matcher(
  (a, e) => e.every(item => a.includes(item)),
  (a, e) => `expected that ${a} includes ${e}`
);

has.length = matcher(
  (a, e) => a.length === e,
  (a, e) => `expected ${a} to have length of ${e}`
);

module.exports = has;
