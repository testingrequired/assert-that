const assertThat = require("./lib/assertThat");
const not = require("./lib/matchers/not");
const equals = require("./lib/matchers/equals");
const is = require("./lib/matchers/is");
const has = require("./lib/matchers/has");
const throws = require("./lib/matchers/throws");

module.exports = {
  assertThat,
  equals,
  is,
  has,
  throws,
  not
};
