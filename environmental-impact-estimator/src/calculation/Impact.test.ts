import { assert, beforeEach, describe, expect, test } from "vitest";
import { Impact } from "./Impact";

describe("Impact", () => {
  describe("when initialized with 0", () => {
    let sut: Impact;
    beforeEach(() => {
      sut = new Impact();
    });

    test("getter return 0 values", () => {
      expect(sut.kWh).toBe(0);
      expect(sut.gC02eq).toBe(0);
    });

    describe("when adding impacts", () => {
      beforeEach(() => {
        sut.add("a", new Impact(3, 4));
        sut.add("b", new Impact(5, 6));
      });

      test("sums up impact values", () => {
        expect(sut.kWh).toBe(8);
        expect(sut.gC02eq).toBe(10);
      });

      test("prints path, values and percentage", () => {
        expect(sut.print("root")).toBe(`root,8,1,10,1
root > a,3,0.375,4,0.4
root > b,5,0.625,6,0.6`);
      });
    });
  });

  describe("when initialized with values", () => {
    let sut: Impact;
    beforeEach(() => {
      sut = new Impact(1, 2);
    });

    test("getter return given values", () => {
      expect(sut.kWh).toBe(1);
      expect(sut.gC02eq).toBe(2);
    });

    test("can not add another impact", () => {
      expect(() => sut.add("a", new Impact())).toThrow();
    });

    test("prints path and values", () => {
      expect(sut.print("root")).toBe("root,1,1,2,1");
    });
  });
});
