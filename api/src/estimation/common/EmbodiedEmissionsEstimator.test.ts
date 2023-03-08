import {describe, expect, it} from "vitest";
import {EmbodiedEmissionsEstimator} from "./EmbodiedEmissionsEstimator";

describe("EmbodiedEmissionsEstimator", () => {
    it("estimates embodied emissions", () => {
        const actual = new EmbodiedEmissionsEstimator().estimate(2, 1000, 2, 4);
        expect(actual.gC02eq).toBe(1000);
    });
});