import {describe, expect, test, vi} from "vitest";
import {testTeam} from "../../testing/testTeam";
import {TeamCalculator} from "./TeamCalculator";
import {Impact} from "../Impact";

vi.mock('./CommuteCalculator', () => {
    const CommuteCalculator = vi.fn();
    CommuteCalculator.prototype.calculate = vi.fn(() => {
        return new Impact(1, 1);
    })
    return {CommuteCalculator};
})

vi.mock('./WorkCalculator', () => {
    const WorkCalculator = vi.fn();
    WorkCalculator.prototype.calculate = vi.fn(() => {
        return new Impact(2, 2);
    })
    return {WorkCalculator};
})

vi.mock('./TravelCalculator', () => {
    const TravelCalculator = vi.fn();
    TravelCalculator.prototype.calculate = vi.fn(() => {
        return new Impact(3, 3);
    })
    return {TravelCalculator};
})

describe("TeamCalculator", () => {
    test("calls commute calculators", () => {
        const sut = new TeamCalculator();
        const actual = sut.calculate(testTeam);
        expect(actual.get("commute")).not.toBeUndefined();
        expect(actual.get("commute")!.kWh).toBe(1);
        expect(actual.get("commute")!.gC02eq).toBe(1);
    });

    test("calls work calculators", () => {
        const sut = new TeamCalculator();
        const actual = sut.calculate(testTeam);
        expect(actual.get("work")).not.toBeUndefined();
        expect(actual.get("work")!.kWh).toBe(2);
        expect(actual.get("work")!.gC02eq).toBe(2);
    });

    test("calls travel calculators", () => {
        const sut = new TeamCalculator();
        const actual = sut.calculate(testTeam);
        expect(actual.get("travel")).not.toBeUndefined();
        expect(actual.get("travel")!.kWh).toBe(3);
        expect(actual.get("travel")!.gC02eq).toBe(3);
    });
});
