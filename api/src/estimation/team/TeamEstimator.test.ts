import {describe, expect, test, vi} from "vitest";
import {testTeam} from "../../interfaces/testTeam";
import {TeamEstimator} from "./TeamEstimator";
import {Impact} from "../Impact";

vi.mock('./CommuteEstimator', () => {
    const CommuteEstimator = vi.fn();
    CommuteEstimator.prototype.estimate = vi.fn(() => {
        return new Impact(1, "1");
    })
    return {CommuteEstimator};
})

vi.mock('./WorkEstimator', () => {
    const WorkEstimator = vi.fn();
    WorkEstimator.prototype.estimate = vi.fn(() => {
        return new Impact(2, "2");
    })
    return {WorkEstimator};
})

vi.mock('./TravelEstimator', () => {
    const TravelEstimator = vi.fn();
    TravelEstimator.prototype.estimate = vi.fn(() => {
        return new Impact(3, "3");
    })
    return {TravelEstimator};
})

vi.mock('../common/EmbodiedEmissionsEstimator', () => {
    const EmbodiedEmissionsEstimator = vi.fn();
    EmbodiedEmissionsEstimator.prototype.estimate = vi.fn(() => {
        return new Impact(4, "4");
    })
    return {EmbodiedEmissionsEstimator};
})

describe("TeamEstimator", () => {
    test("calls commute Estimators", () => {
        const sut = new TeamEstimator();
        const actual = sut.estimate(testTeam);
        expect(actual.get("commute")).not.toBeUndefined();
        expect(actual.get("commute")!.gC02eq).toBe(1);
    });

    test("calls work Estimators", () => {
        const sut = new TeamEstimator();
        const actual = sut.estimate(testTeam);
        expect(actual.get("work")).not.toBeUndefined();
        expect(actual.get("work")!.gC02eq).toBe(2);
    });

    test("calls travel Estimators", () => {
        const sut = new TeamEstimator();
        const actual = sut.estimate(testTeam);
        expect(actual.get("travel")).not.toBeUndefined();
        expect(actual.get("travel")!.gC02eq).toBe(3);
    });

    test("calls EmbodiedEmissionsEstimator", () => {
        const sut = new TeamEstimator();
        const actual = sut.estimate(testTeam);
        expect(actual.get("embodiedEmissions")).not.toBeUndefined();
        expect(actual.get("embodiedEmissions")!.gC02eq).toBe(4);
    });
});

