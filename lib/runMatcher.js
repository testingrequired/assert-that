import assert from "assert";

export default function runMatcher(actual) {
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
