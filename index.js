const assert = require("assert");

/**
 *
 * @param {*} actual
 * @param  {...any} matchers
 */
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

const strictEquals = expected => actual =>
  assert(actual === expected, `expected ${actual} to strict equal ${expected}`);

const is = strictEquals;

is.true = actual => assert(actual === true, `expected ${actual} to be true`);

is.truthy = actual => assert(actual, `expected ${actual} to be truthy`);

is.false = actual => assert(actual === false, `expected ${actual} to be false`);

is.falsey = actual => assert(!actual, `expected ${actual} to be falsey`);

is.empty = actual =>
  assert(actual.length === 0, `expected ${actual} to be empty`);

const includes = expected => actual =>
  assert(
    actual.includes(expected),
    `expected that ${actual} includes ${expected}`
  );

const hasLength = expected => actual =>
  assert(
    actual.length === expected,
    `expected that ${actual} has length of ${expected}`
  );

assertThat("", is.empty);
