import {describe, expect, test} from "vitest";
import {testTeam} from "../../common/testing/testTeam";
import {WorkEstimator} from "./WorkEstimator";
import {BUSINESS_DAYS_PER_YEAR} from "../common/Constants";
import {wattHoursToKiloWattHours} from "../../common/testing/unitConversion";

describe("WorkEstimator", () => {

    const baseExpectation_kWh = wattHoursToKiloWattHours((testTeam.workplacePowerUsage_W * BUSINESS_DAYS_PER_YEAR * testTeam.duration_years * testTeam.workingHours_perDay));

    test("estimates main location impact", () => {
        const impact = new WorkEstimator().estimate({
            ...testTeam,
            teamDistribution_nr: {...testTeam.teamDistribution_nr, mainLocation: 6},
            emissionFactor_gC02eqPerKWh: {...testTeam.emissionFactor_gC02eqPerKWh, mainLocation: 5}
        });
        const actual = impact.get("mainLocation");
        expect(actual!.gC02eq).toBe(baseExpectation_kWh * 6 * 5);
    });

    test("estimates remote location impact", () => {
        const impact = new WorkEstimator().estimate({
            ...testTeam,
            teamDistribution_nr: {...testTeam.teamDistribution_nr, remoteLocation: 7},
            emissionFactor_gC02eqPerKWh: {...testTeam.emissionFactor_gC02eqPerKWh, remoteLocation: 4}
        });
        const actual = impact.get("remoteLocation");
        expect(actual!.gC02eq).toBe(baseExpectation_kWh * 7 * 4);
    });
});

