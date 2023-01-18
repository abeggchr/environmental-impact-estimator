import {describe, expect, test} from "vitest";
import {testTeam} from "../../testing/testTeam";
import {WorkCalculator} from "./WorkCalculator";

describe("WorkCalculator", () => {

    const baseExpectation_kWh = testTeam.workingDays_perYear * testTeam.duration_years * testTeam.teamSize_nr * testTeam.workingHours_perDay * testTeam.powerUsageWorkplace_W / 1000;

    test("calculates main location impact", () => {
        const impact = new WorkCalculator().calculate({
            ...testTeam,
            distribution_percentage: {...testTeam.distribution_percentage, mainLocation: 0.6},
            energyEmission_gC02eqPerKWh: {...testTeam.energyEmission_gC02eqPerKWh, mainLocation: 5}
        });
        const actual = impact.get("mainLocation");
        expect(actual!.kWh).toBe(baseExpectation_kWh * 0.6);
        expect(actual!.gC02eq).toBe(baseExpectation_kWh * 0.6 * 5);
    });

    test("calculates remote location impact", () => {
        const impact = new WorkCalculator().calculate({
            ...testTeam,
            distribution_percentage: {...testTeam.distribution_percentage, remoteLocation: 0.7},
            energyEmission_gC02eqPerKWh: {...testTeam.energyEmission_gC02eqPerKWh, remoteLocation: 4}
        });
        const actual = impact.get("remoteLocation");
        expect(actual!.kWh).toBe(baseExpectation_kWh * 0.7);
        expect(actual!.gC02eq).toBe(baseExpectation_kWh * 0.7 * 4);
    });
});

