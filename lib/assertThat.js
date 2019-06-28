import runMatcher from "./runMatcher";

const assertThat = (actual, ...matchers) => {
  const errors = matchers.reduce(runMatcher(actual), []);
  if (errors.length > 0) throw new Error(errors);
};

export default assertThat;
