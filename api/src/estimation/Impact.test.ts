import {beforeEach, describe, expect, test} from "vitest";
import {Impact} from "./Impact";

describe("Impact", () => {
  describe("when initialized with undefined", () => {
    let sut: Impact;
    beforeEach(() => {
      sut = new Impact();
    });

    test("getter return 0 values", () => {
      expect(sut.gC02eq).toBe(0);
    });

    describe("when adding impacts", () => {
      beforeEach(() => {
        sut.add("a", new Impact(4, "F4"));
        sut.add("b", new Impact(6, "F6"));
      });

      test("sums up impact values", () => {
        expect(sut.gC02eq).toBe(10);
      });

      test("prints path, value, formula and percentage", () => {
        expect(sut.print("root")).toBe(`root,10,1.00,
root > a,4,0.40,F4
root > b,6,0.60,F6`);
      });
    });


    describe("when adding impacts in two levels", () => {
      beforeEach(() => {
        const a = new Impact(0, "F0");
        a.add("aa", new Impact(4, "F4"));
        a.add("ab", new Impact(5, "F5"));
        sut.add("a", a);

        const b = new Impact(0, "F0");
        b.add("ba", new Impact(6, "F6"));
        b.add("bb", new Impact(7, "F7"));
        sut.add("b", b);
      });

      test("sums up impact values", () => {
        expect(sut.gC02eq).toBe(22);
      });
    });
  });

  describe("when initialized with values", () => {
    let sut: Impact;
    beforeEach(() => {
      sut = new Impact(2, "F2");
    });

    test("getter return given values", () => {
      expect(sut.gC02eq).toBe(2);
    });

    test("can not add another impact", () => {
      expect(() => sut.add("a", new Impact())).toThrow();
    });

    test("prints path, values and formula", () => {
      expect(sut.print("root")).toBe("root,2,1.00,F2");
    });
  });
});
