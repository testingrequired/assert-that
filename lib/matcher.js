const matcher = (conditionFn, messageFn) => expected => actual => {
  const condition = conditionFn(actual, expected);
  const message = messageFn(actual, expected);
  return { condition, message };
};

export default matcher;
