import {describe, expect, test} from "vitest";
import {testTeam} from "../../testing/testTeam";
import {WorkEstimator} from "./WorkEstimator";

describe("WorkEstimator", () => {

    const baseExpectation_kWh = testTeam.workingDays_perYear * testTeam.duration_years * (testTeam.teamDistribution_nr.mainLocation + testTeam.teamDistribution_nr.remoteLocation) * testTeam.workingHours_perDay * testTeam.powerUsageWorkplace_W / 1000;

    test("estimates main location impact", () => {
        const impact = new WorkEstimator().calculate({
            ...testTeam,
            teamDistribution_nr: {...testTeam.teamDistribution_nr, mainLocation: 0.6},
            emissionFactor_gC02eqPerKWh: {...testTeam.emissionFactor_gC02eqPerKWh, mainLocation: 5}
        });
        const actual = impact.get("mainLocation");
        expect(actual!.kWh).toBe(baseExpectation_kWh * 0.6);
        expect(actual!.gC02eq).toBe(baseExpectation_kWh * 0.6 * 5);
    });

    test("estimates remote location impact", () => {
        const impact = new WorkEstimator().calculate({
            ...testTeam,
            teamDistribution_nr: {...testTeam.teamDistribution_nr, remoteLocation: 0.7},
            emissionFactor_gC02eqPerKWh: {...testTeam.emissionFactor_gC02eqPerKWh, remoteLocation: 4}
        });
        const actual = impact.get("remoteLocation");
        expect(actual!.kWh).toBe(baseExpectation_kWh * 0.7);
        expect(actual!.gC02eq).toBe(baseExpectation_kWh * 0.7 * 4);
    });
});

