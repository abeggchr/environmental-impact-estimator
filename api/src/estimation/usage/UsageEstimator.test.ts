import {describe, expect, test, vi} from "vitest";
import {Impact} from "../Impact";
import {UsageEstimator} from "./UsageEstimator";
import {testUsage} from "../../common/testing/testUsage";


vi.mock('../common/EmbodiedEmissionsEstimator', () => {
    const EmbodiedEmissionsEstimator = vi.fn();
    EmbodiedEmissionsEstimator.prototype.estimate = vi.fn(() => {
        return new Impact(4, "4");
    })
    return {EmbodiedEmissionsEstimator};
})

vi.mock('./WorkEstimator', () => {
    const WorkEstimator = vi.fn();
    WorkEstimator.prototype.estimate = vi.fn(() => {
        return new Impact(2, "2");
    })
    return {WorkEstimator};
})

describe("UsageEstimator", () => {

    test("calls EmbodiedEmissionsEstimator", () => {
        const sut = new UsageEstimator();
        const actual = sut.estimate(testUsage);
        expect(actual.get("embodiedEmissions")).not.toBeUndefined();
        expect(actual.get("embodiedEmissions")!.gC02eq).toBe(4);
        expect(actual.get("work")).not.toBeUndefined();
        expect(actual.get("work")!.gC02eq).toBe(2);
    });
});

