const lib = require("./index");
const { assertThat, equals, is, has, throws } = lib;

describe("assertThat", () => {
  it("should call matcher with actual value", () => {
    const actual = 10;
    const matcher = jest.fn(() => ({
      condition: true,
      message: ""
    }));

    assertThat(10, matcher);

    expect(matcher).toBeCalledWith(actual);
  });

  it("should throw error if matcher throws", () => {
    const matcher = jest.fn(() => {
      throw new Error("error message");
    });

    const matcherB = jest.fn(() => {
      throw new Error("error message2");
    });

    expect(() => assertThat(null, matcher, matcherB)).toThrowError(
      /Error: error message,Error: error message2/
    );
  });

  it("should not throw error if matcher doesn't throws", () => {
    const matcher = jest.fn(() => ({ condition: true, message: "" }));
    expect(() => assertThat(null, matcher)).not.toThrowError();
  });
});

describe("equals", () => {
  it("should throw error when not loosly equals", () => {
    expect(equals(1)("10")).toEqual({
      condition: false,
      message: "expected 10 to equal 1"
    });
  });

  it("should not throw error when loosly equals", () => {
    expect(equals(1)("1")).toEqual({
      condition: true,
      message: "expected 1 to equal 1"
    });
  });

  describe("strict", () => {
    it("should throw error when not loosly equals", () => {
      expect(equals.strict(1)("10")).toEqual({
        condition: false,
        message: "expected 10 to strictly equal 1"
      });
    });

    it("should throw error when loosly equals", () => {
      expect(equals.strict(1)("1")).toEqual({
        condition: false,
        message: "expected 1 to strictly equal 1"
      });
    });

    it("should not throw error when strictly equals", () => {
      expect(equals.strict(1)(1)).toEqual({
        condition: true,
        message: "expected 1 to strictly equal 1"
      });
    });
  });
});

describe("is", () => {
  describe("true", () => {
    it("should throw error when truthy", () => {
      expect(is.true(1)).toEqual({
        condition: false,
        message: "expected 1 to be true"
      });
    });

    it("should not throw error when true", () => {
      expect(is.true(true)).toEqual({
        condition: true,
        message: "expected true to be true"
      });
    });

    it("should throw error when falsey", () => {
      expect(is.true(0)).toEqual({
        condition: false,
        message: "expected 0 to be true"
      });
    });

    it("should throw error when false", () => {
      expect(is.true(false)).toEqual({
        condition: false,
        message: "expected false to be true"
      });
    });
  });

  describe("false", () => {
    it("should throw error when falsey", () => {
      expect(is.false(0)).toEqual({
        condition: false,
        message: "expected 0 to be false"
      });
    });

    it("should not throw error when false", () => {
      expect(is.false(false)).toEqual({
        condition: true,
        message: "expected false to be false"
      });
    });

    it("should throw error when truthy", () => {
      expect(is.false(1)).toEqual({
        condition: false,
        message: "expected 1 to be false"
      });
    });

    it("should throw error when true", () => {
      expect(is.false(true)).toEqual({
        condition: false,
        message: "expected true to be false"
      });
    });
  });

  describe("truthy", () => {
    it("should not throw error when truthy", () => {
      expect(is.truthy(1)).toEqual({
        condition: true,
        message: "expected 1 to be truthy"
      });
    });

    it("should not throw error when true", () => {
      expect(is.truthy(true)).toEqual({
        condition: true,
        message: "expected true to be truthy"
      });
    });

    it("should throw error when falsey", () => {
      expect(is.truthy(0)).toEqual({
        condition: false,
        message: "expected 0 to be truthy"
      });
    });

    it("should throw error when false", () => {
      expect(is.truthy(false)).toEqual({
        condition: false,
        message: "expected false to be truthy"
      });
    });
  });

  describe("falsey", () => {
    it("should not throw error when falsey", () => {
      expect(is.falsey(0)).toEqual({
        condition: true,
        message: "expected 0 to be falsey"
      });
    });

    it("should not throw error when false", () => {
      expect(is.falsey(false)).toEqual({
        condition: true,
        message: "expected false to be falsey"
      });
    });

    it("should throw error when truthy", () => {
      expect(is.falsey(1)).toEqual({
        condition: false,
        message: "expected 1 to be falsey"
      });
    });

    it("should throw error when true", () => {
      expect(is.falsey(true)).toEqual({
        condition: false,
        message: "expected true to be falsey"
      });
    });
  });

  describe("empty", () => {
    it("should not throw error if array is empty", () => {
      expect(() => is.empty([])).not.toThrowError();
    });

    it("should throw error if array is not empty", () => {
      expect(is.empty([1, 2, 3])).toEqual({
        condition: false,
        message: "expected 1,2,3 to be empty"
      });
    });

    it("should not throw error if string is empty", () => {
      expect(is.empty("")).toEqual({
        condition: true,
        message: "expected  to be empty"
      });
    });

    it("should throw error if string is not empty", () => {
      expect(is.empty("dog")).toEqual({
        condition: false,
        message: "expected dog to be empty"
      });
    });
  });
});

describe("has", () => {
  describe("item", () => {
    it("should not throw error if array includes item", () => {
      expect(has.item("dog")(["", "dog"])).toEqual({
        condition: true,
        message: "expected ,dog to include dog"
      });
    });

    it("should not throw error if string includes item", () => {
      expect(has.item("dog")("The quick brown dog")).toEqual({
        condition: true,
        message: "expected The quick brown dog to include dog"
      });
    });

    it("should throw error if array doesn't include item", () => {
      expect(has.item("cat")(["", "dog"])).toEqual({
        condition: false,
        message: "expected ,dog to include cat"
      });
    });

    it("should throw error if string doesn't include item", () => {
      expect(has.item("cat")("The quick brown dog")).toEqual({
        condition: false,
        message: "expected The quick brown dog to include cat"
      });
    });
  });

  describe("items", () => {
    it("should not throw error if array includes item", () => {
      expect(has.items(["dog", "cat"])(["", "dog", "cat"])).toEqual({
        condition: true,
        message: "expected that ,dog,cat includes dog,cat"
      });
    });

    it("should not throw error if string includes item", () => {
      expect(has.items(["dog", "quick"])("The quick brown dog")).toEqual({
        condition: true,
        message: "expected that The quick brown dog includes dog,quick"
      });
    });

    it("should throw error if array doesn't includes item", () => {
      expect(has.items(["dog", "rat"])(["", "dog", "cat"])).toEqual({
        condition: false,
        message: "expected that ,dog,cat includes dog,rat"
      });
    });

    it("should throw error if string doesn't includes item", () => {
      expect(has.items(["cat", "quick"])("The quick brown dog")).toEqual({
        condition: false,
        message: "expected that The quick brown dog includes cat,quick"
      });
    });
  });

  describe("length", () => {
    it("should not throw error if array has length", () => {
      expect(has.length(2)(["", "dog"])).toEqual({
        condition: true,
        message: "expected ,dog to have length of 2"
      });
    });

    it("should throw error if array doesn't length", () => {
      expect(has.length(1)(["", "dog"])).toEqual({
        condition: false,
        message: "expected ,dog to have length of 1"
      });
    });

    it("should not throw error if string has length", () => {
      expect(has.length(2)("Ab")).toEqual({
        condition: true,
        message: "expected Ab to have length of 2"
      });
    });

    it("should throw error if string doesn't length", () => {
      expect(has.length(1)("Ab")).toEqual({
        condition: false,
        message: "expected Ab to have length of 1"
      });
    });
  });
});

describe("throws", () => {
  let fn = () => {};

  it("should throw error if error isn't thrown", () => {
    expect(throws(fn)).toEqual({
      condition: false,
      message: "expected () => {} to throw error"
    });
  });

  it("should not throw error if error is thrown", () => {
    // prettier-ignore
    fn = () => {throw new Error();};

    expect(throws(fn)).toEqual({
      condition: true,
      message:
        "expected () => {\n      throw new Error();\n    } to throw error"
    });
  });
});
