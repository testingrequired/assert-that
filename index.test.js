const lib = require("./index");
const { equals, is } = lib;

describe("equals", () => {
  it("should throw error when not loosly equals", () => {
    expect(() => equals(1)("10")).toThrowError(/expected 10 to equal 1/);
  });

  it("should not throw error when loosly equals", () => {
    expect(() => equals(1)("1")).not.toThrowError();
  });

  describe("strict", () => {
    it("should throw error when not loosly equals", () => {
      expect(() => equals.strict(1)("10")).toThrowError(
        /expected 10 to strictly equal 1/
      );
    });

    it("should throw error when loosly equals", () => {
      expect(() => equals.strict(1)("1")).toThrowError(
        /expected 1 to strictly equal 1/
      );
    });

    it("should not throw error when strictly equals", () => {
      expect(() => equals.strict(1)(1)).not.toThrowError();
    });
  });
});
