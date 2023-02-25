import {describe, expect, it} from "vitest";
import {testMachine} from "../../testing/testMachine";
import {PhysicalMachineEstimator} from "./PhysicalMachineEstimator";

describe("PhysicalMachineEstimator", () => {
    it("estimates embodied emissions", () => {
        const machine = {
            ...testMachine,
            embodiedEmissions_gC02eq: 1000,
            duration_years: 2,
            expectedLifespan_years: 4
        };

        const actual = new PhysicalMachineEstimator().estimate(machine);

        expect(actual.gC02eq).toBe(500);
    });
});