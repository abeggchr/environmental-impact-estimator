import {beforeEach, describe, expect, test} from "vitest";
import {Impact} from "./Impact";

describe("Impact", () => {
  describe("when initialized with 0", () => {
    let sut: Impact;
    beforeEach(() => {
      sut = new Impact();
    });

    test("getter return 0 values", () => {
      expect(sut.gC02eq).toBe(0);
    });

    describe("when adding impacts", () => {
      beforeEach(() => {
        sut.add("a", new Impact(4));
        sut.add("b", new Impact(6));
      });

      test("sums up impact values", () => {
        expect(sut.gC02eq).toBe(10);
      });

      test("prints path, values and percentage", () => {
        expect(sut.print("root")).toBe(`root,10,1
root > a,4,0.4
root > b,6,0.6`);
      });
    });

    describe("when adding impacts in two levels", () => {
      beforeEach(() => {
        const a = new Impact(0);
        a.add("aa", new Impact(4));
        a.add("ab", new Impact(5));
        sut.add("a", a);

        const b = new Impact(0);
        b.add("ba", new Impact(6));
        b.add("bb", new Impact(7));
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
      sut = new Impact(2);
    });

    test("getter return given values", () => {
      expect(sut.gC02eq).toBe(2);
    });

    test("can not add another impact", () => {
      expect(() => sut.add("a", new Impact())).toThrow();
    });

    test("prints path and values", () => {
      expect(sut.print("root")).toBe("root,2,1");
    });
  });
});
