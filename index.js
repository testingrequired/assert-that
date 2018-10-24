const assert = require("assert");

const matcher = (
  conditionFn,
  messageFn,
  assertFn = assert
) => expected => actual => {
  const condition = conditionFn(expected, actual);
  const message = messageFn(expected, actual);
  assertFn(condition, message);
};

const matcherActual = (conditionFn, messageFn, assertFn = assert) => actual => {
  const condition = conditionFn(actual);
  const message = messageFn(actual);
  assertFn(condition, message);
};

const matcherArray = (conditionFn, messageFn, assertFn = assert) => (
  ...expected
) => actual => {
  const condition = expected.every(item => conditionFn(item, actual));
  const message = messageFn(expected, actual);
  assertFn(condition, message);
};

const assertThat = (actual, ...matchers) => {
  const errors = matchers.reduce(runMatcher(actual), []);
  if (errors.length > 0) throw new Error(errors);

  function runMatcher(actual) {
    return (results, matcher) => {
      try {
        matcher(actual);
      } catch (e) {
        results.push(e);
      }
      return results;
    };
  }
};

const equals = matcher(
  (e, a) => a == e,
  (e, a) => `expected ${a} to equal ${e}`
);

equals.strict = matcher(
  (e, a) => a === e,
  (e, a) => `expected ${a} to strictly equal ${e}`
);

const is = equals.strict;
is.true = matcherActual(a => a === true, a => `expected ${a} to be true`);
is.false = matcherActual(a => a === false, a => `expected ${a} to be false`);
is.truthy = matcherActual(a => a, a => `expected ${a} to be truthy`);
is.falsey = matcherActual(a => !a, a => `expected ${a} to be falsey`);
is.empty = matcherActual(a => a.length === 0, a => `expected ${a} to be empty`);

const has = {};

has.item = matcher(
  (e, a) => a.includes(e),
  (e, a) => `expected ${a} to include ${e}`
);

has.items = (...expected) => actual =>
  assert(
    expected.every(item => actual.includes(item)),
    `expected that ${actual} includes ${expected}`
  );

has.length = matcher(
  (e, a) => a.length === e,
  (e, a) => `expected ${a} to have length of ${e}`
);

const throws = matcherActual(
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
