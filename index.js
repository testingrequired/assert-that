const assert = require("assert");

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

const equals = expected => actual =>
  assert(actual == expected, `expected ${actual} to equal ${expected}`);

equals.strict = expected => actual =>
  assert(
    actual === expected,
    `expected ${actual} to strictly equal ${expected}`
  );

const is = equals.strict;

is.true = actual => assert(actual === true, `expected ${actual} to be true`);
is.false = actual => assert(actual === false, `expected ${actual} to be false`);
is.truthy = actual => assert(actual, `expected ${actual} to be truthy`);
is.falsey = actual => assert(!actual, `expected ${actual} to be falsey`);

is.empty = actual =>
  assert(actual.length === 0, `expected ${actual} to be empty`);

const has = {};

has.item = expected => actual =>
  assert(
    actual.includes(expected),
    `expected that ${actual} includes ${expected}`
  );

has.items = (...expected) => actual =>
  assert(
    expected.every(item => item.includes(actual)),
    `expected that ${actual} includes ${expected}`
  );

has.length = expected => actual =>
  assert(
    actual.length === expected,
    `expected that ${actual} has length of ${expected}`
  );

module.exports = {
  assertThat,
  equals,
  is,
  has
};
