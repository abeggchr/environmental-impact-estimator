import {describe, expect, test} from "vitest";
import {CommuteEstimator} from "./CommuteEstimator";
import {testTeam} from "../../interfaces/testTeam";
import {BUSINESS_DAYS_PER_YEAR} from "../common/Constants";

describe("CommuteEstimator", () => {
    const baseExpectation = BUSINESS_DAYS_PER_YEAR * testTeam.duration_years * (testTeam.teamDistribution_nr.mainLocation + testTeam.teamDistribution_nr.remoteLocation) * testTeam.workLocation_percentage.office;

    test("estimates individual traffic combustion impact", () => {
        const expected = baseExpectation * 42 * 100 * 0.2;
        const impact = new CommuteEstimator().estimate({
            ...testTeam,
            commuteDistance_km: 42,
            commuteEmission_gC02eqPerKm: {...testTeam.commuteEmission_gC02eqPerKm, individualTrafficCombustion: 100},
            commuteModalSplit_percentage: {...testTeam.commuteModalSplit_percentage, individualTrafficCombustion: 0.2}
        });
        const actual = impact.get("individualTrafficCombustion");
        expect(actual!.gC02eq).toBe(expected);
    });

    test("estimates individual traffic slow impact", () => {
        const expected = baseExpectation * 42 * 50 * 0.3;
        const impact = new CommuteEstimator().estimate({
            ...testTeam,
            commuteDistance_km: 42,
            commuteEmission_gC02eqPerKm: {...testTeam.commuteEmission_gC02eqPerKm, individualTrafficSlow: 50},
            commuteModalSplit_percentage: {...testTeam.commuteModalSplit_percentage, individualTrafficSlow: 0.3}
        });
        const actual = impact.get("individualTrafficSlow");
        expect(actual!.gC02eq).toBe(expected);
    });

    test("estimates individual traffic electric impact", () => {
        const expected = baseExpectation * 84 * 25 * 0.4;
        const impact = new CommuteEstimator().estimate({
            ...testTeam,
            commuteDistance_km: 84,
            commuteEmission_gC02eqPerKm: {...testTeam.commuteEmission_gC02eqPerKm, individualTrafficElectric: 25},
            commuteModalSplit_percentage: {...testTeam.commuteModalSplit_percentage, individualTrafficElectric: 0.4}
        });
        const actual = impact.get("individualTrafficElectric");
        expect(actual!.gC02eq).toBe(expected);
    });

    test("estimates public traffic impact", () => {
        const expected = baseExpectation * 21 * 25 * 0.5;
        const impact = new CommuteEstimator().estimate({
            ...testTeam,
            commuteDistance_km: 21,
            commuteEmission_gC02eqPerKm: {...testTeam.commuteEmission_gC02eqPerKm, publicTraffic: 25},
            commuteModalSplit_percentage: {...testTeam.commuteModalSplit_percentage, publicTraffic: 0.5}
        });
        const actual = impact.get("publicTraffic");
        expect(actual!.gC02eq).toBe(expected);
    });
});

