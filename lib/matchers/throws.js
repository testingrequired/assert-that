import matcher from "../matcher";

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

export default throws;
