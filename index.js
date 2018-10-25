const assert = require("assert");

const matcher = (conditionFn, messageFn) => expected => actual => {
  const condition = conditionFn(actual, expected);
  const message = messageFn(actual, expected);
  return { condition, message };
};

const assertThat = (actual, ...matchers) => {
  const errors = matchers.reduce(runMatcher(actual), []);
  if (errors.length > 0) throw new Error(errors);

  function runMatcher(actual) {
    return (results, matcher) => {
      try {
        const { condition, message } = matcher(actual);
        assert(condition, message);
      } catch (e) {
        results.push(e);
      }
      return results;
    };
  }
};

const equals = matcher(
  (a, e) => a == e,
  (a, e) => `expected ${a} to equal ${e}`
);

equals.strict = matcher(
  (a, e) => a === e,
  (a, e) => `expected ${a} to strictly equal ${e}`
);

const is = equals.strict;
is.true = matcher(a => a === true, a => `expected ${a} to be true`);
is.false = matcher(a => a === false, a => `expected ${a} to be false`);
is.truthy = matcher(a => !!a, a => `expected ${a} to be truthy`);
is.falsey = matcher(a => !a, a => `expected ${a} to be falsey`);
is.empty = matcher(a => a.length === 0, a => `expected ${a} to be empty`);

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

const throws = matcher(
  a => {
    try {
      a();
      return false;
    } catch (e) {
      return true;
    }
  },
  a => `expected ${a} to throw error`
);

module.exports = {
  assertThat,
  equals,
  is,
  has,
  throws
};
