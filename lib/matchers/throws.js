const matcher = require("../matcher");

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

module.exports = throws;
