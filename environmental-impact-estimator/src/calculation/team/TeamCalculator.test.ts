import {describe, expect, test, vi} from "vitest";
import {testTeam} from "./testTeam";
import {TeamCalculator} from "./TeamCalculator";
import {Impact} from "../Impact";


vi.mock('./CommuteCalculator', () => {
    const CommuteCalculator = vi.fn();
    CommuteCalculator.prototype.calculate = vi.fn(() => {
        return new Impact(1, 1);
    })
    return {CommuteCalculator};
})

describe("TeamCalculator", () => {
    test("calls underlying calculators", () => {
        const sut = new TeamCalculator();
        const actual = sut.calculate(testTeam);
        expect(actual.get("commute")).not.toBeUndefined();
        expect(actual.get("commute")!.kWh).toBe(1);
        expect(actual.get("commute")!.gC02eq).toBe(1);
    });
});

