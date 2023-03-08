import {describe, expect, test, vi} from "vitest";
import {Impact} from "../Impact";
import {UsageEstimator} from "./UsageEstimator";
import {testUsage} from "../../testing/testUsage";


vi.mock('../common/EmbodiedEmissionsEstimator', () => {
    const EmbodiedEmissionsEstimator = vi.fn();
    EmbodiedEmissionsEstimator.prototype.estimate = vi.fn(() => {
        return new Impact(4, "4");
    })
    return {EmbodiedEmissionsEstimator};
})

describe("UsageEstimator", () => {

    test("calls EmbodiedEmissionsEstimator", () => {
        const sut = new UsageEstimator();
        const actual = sut.estimate(testUsage);
        expect(actual.get("embodiedEmissions")).not.toBeUndefined();
        expect(actual.get("embodiedEmissions")!.gC02eq).toBe(4);
    });
});

