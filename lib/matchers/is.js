const matcher = require("../matcher");
const equals = require("./equals");

const is = equals.strict;
is.true = matcher(a => a === true, a => `expected ${a} to be true`);
is.false = matcher(a => a === false, a => `expected ${a} to be false`);
is.truthy = matcher(a => !!a, a => `expected ${a} to be truthy`);
is.falsey = matcher(a => !a, a => `expected ${a} to be falsey`);
is.empty = matcher(a => a.length === 0, a => `expected ${a} to be empty`);

module.exports = is;
