module.exports = function invertCondition({ condition, message }) {
  return { condition: !condition, message };
};
