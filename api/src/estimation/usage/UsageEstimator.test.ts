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

vi.mock('./ElectricityEstimator', () => {
    const ElectricityEstimator = vi.fn();
    ElectricityEstimator.prototype.estimate = vi.fn(() => {
        return new Impact(2, "2");
    })
    return {ElectricityEstimator};
})

vi.mock('./InternetTrafficEstimator', () => {
    const InternetTrafficEstimator = vi.fn();
    InternetTrafficEstimator.prototype.estimate = vi.fn(() => {
        return new Impact(3, "3");
    })
    return {InternetTrafficEstimator};
})

describe("UsageEstimator", () => {

    test("calls EmbodiedEmissionsEstimator", () => {
        const sut = new UsageEstimator();
        const actual = sut.estimate(testUsage);
        expect(actual.get("embodiedEmissions")).not.toBeUndefined();
        expect(actual.get("embodiedEmissions")!.gC02eq).toBe(4);
        expect(actual.get("electricity")).not.toBeUndefined();
        expect(actual.get("electricity")!.gC02eq).toBe(2);
        expect(actual.get("internetTraffic")).not.toBeUndefined();
        expect(actual.get("internetTraffic")!.gC02eq).toBe(3);
    });
});

