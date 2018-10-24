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

describe("is", () => {
  describe("true", () => {
    it("should throw error when truthy", () => {
      expect(() => is.true(1)).toThrowError(/expected 1 to be true/);
    });

    it("should not throw error when true", () => {
      expect(() => is.true(true)).not.toThrowError();
    });

    it("should throw error when falsey", () => {
      expect(() => is.true(0)).toThrowError(/expected 0 to be true/);
    });

    it("should throw error when false", () => {
      expect(() => is.true(false)).toThrowError(/expected false to be true/);
    });
  });

  describe("false", () => {
    it("should throw error when falsey", () => {
      expect(() => is.false(0)).toThrowError(/expected 0 to be false/);
    });

    it("should not throw error when false", () => {
      expect(() => is.false(false)).not.toThrowError();
    });

    it("should throw error when truthy", () => {
      expect(() => is.false(1)).toThrowError(/expected 1 to be false/);
    });

    it("should throw error when true", () => {
      expect(() => is.false(true)).toThrowError(/expected true to be false/);
    });
  });

  describe("truthy", () => {
    it("should not throw error when truthy", () => {
      expect(() => is.truthy(1)).not.toThrowError();
    });

    it("should not throw error when true", () => {
      expect(() => is.truthy(true)).not.toThrowError();
    });

    it("should throw error when falsey", () => {
      expect(() => is.truthy(0)).toThrowError(/expected 0 to be truthy/);
    });

    it("should throw error when false", () => {
      expect(() => is.truthy(false)).toThrowError(
        /expected false to be truthy/
      );
    });
  });

  describe("falsey", () => {
    it("should not throw error when falsey", () => {
      expect(() => is.falsey(0)).not.toThrowError();
    });

    it("should not throw error when false", () => {
      expect(() => is.falsey(false)).not.toThrowError();
    });

    it("should throw error when truthy", () => {
      expect(() => is.falsey(1)).toThrowError(/expected 1 to be falsey/);
    });

    it("should throw error when true", () => {
      expect(() => is.falsey(true)).toThrowError(/expected true to be falsey/);
    });
  });

  describe("empty", () => {
    it("should not throw error if array is empty", () => {
      expect(() => is.empty([])).not.toThrowError();
    });

    it("should throw error if array is not empty", () => {
      expect(() => is.empty([1, 2, 3])).toThrowError(
        /expected 1,2,3 to be empty/
      );
    });

    it("should not throw error if string is empty", () => {
      expect(() => is.empty("")).not.toThrowError();
    });

    it("should throw error if string is not empty", () => {
      expect(() => is.empty("dog")).toThrowError(/expected dog to be empty/);
    });
  });
});
