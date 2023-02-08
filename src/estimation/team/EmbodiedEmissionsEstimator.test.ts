import {describe, expect, it} from "vitest";
import {EmbodiedEmissionsEstimator} from "./EmbodiedEmissionsEstimator";
import {testTeam} from "../../testing/testTeam";

describe("EmbodiedEmissionsEstimator", () => {
    it("estimates embodied emissions", () => {
        const team = {
            ...testTeam,
            workplaceEmbodiedEmissions_gCO2eq: 1000,
            duration_years: 2,
            workplaceExpectedLifespan_years: 4
        };

        const actual = new EmbodiedEmissionsEstimator().estimate(team);

        expect(actual.gC02eq).toBe(500);
    });
});