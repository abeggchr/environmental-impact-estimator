import {describe, expect, test} from "vitest";
import {ITeam} from "./ITeam";
import {CommuteCalculator} from "./CommuteCalculator";


const testTeam: ITeam = {
    commuteDistance_Km: 1,
    commuteEmission_gC02eqPerKm: {
        individualTrafficCombustion: 1,
        individualTrafficElectric: 1,
        individualTrafficSlow: 1,
        publicTraffic: 1
    },
    commuteModalSplit_Percentage: {
        individualTrafficCombustion: 0.25,
        individualTrafficElectric: 0.25,
        individualTrafficSlow: 0.25,
        publicTraffic: 0.25
    },
    distribution_percentage: {mainLocation: 0.5, remoteLocation: 0.5},
    duration_years: 1,
    energyEmission_gC02eqPerKWh: {mainLocation: 1, remoteLocation: 1},
    size: 1,
    workLocation_Percentage: {home: 0.5, office: 0.5},
    workingDays_perYear: 1,
    workingHours_perDay: 1
};


describe("CommuteCalculator", () => {
    test("calculates individual traffic combustion impact", () => {
        const expected = 1 * 0.25 * 42 * 100 * 0.5;
        const impact = CommuteCalculator.calculate({
            ...testTeam,
            commuteDistance_Km: 42,
            commuteEmission_gC02eqPerKm: {...testTeam.commuteEmission_gC02eqPerKm, individualTrafficCombustion: 100}
        });
        const actual = impact.get("individualTrafficCombustion");
        expect(actual!.gC02eq).toBe(expected);
        expect(actual!.kWh).toBe(0);
    });

    test("calculates individual traffic slow impact", () => {
        const expected = 1 * 0.25 * 42 * 50 * 0.5;
        const impact = CommuteCalculator.calculate({
            ...testTeam,
            commuteDistance_Km: 42,
            commuteEmission_gC02eqPerKm: {...testTeam.commuteEmission_gC02eqPerKm, individualTrafficSlow: 50}
        });
        const actual = impact.get("individualTrafficSlow");
        expect(actual!.gC02eq).toBe(expected);
        expect(actual!.kWh).toBe(0);
    });

    test("calculates individual traffic electric impact", () => {
        const expected = 1 * 0.25 * 84 * 25 * 0.5;
        const impact = CommuteCalculator.calculate({
            ...testTeam,
            commuteDistance_Km: 84,
            commuteEmission_gC02eqPerKm: {...testTeam.commuteEmission_gC02eqPerKm, individualTrafficElectric: 25}
        });
        const actual = impact.get("individualTrafficElectric");
        expect(actual!.gC02eq).toBe(expected);
        expect(actual!.kWh).toBe(0);
    });

    test("calculates public traffic impact", () => {
        const expected = 1 * 0.25 * 21 * 25 * 0.5;
        const impact = CommuteCalculator.calculate({
            ...testTeam,
            commuteDistance_Km: 21,
            commuteEmission_gC02eqPerKm: {...testTeam.commuteEmission_gC02eqPerKm, publicTraffic: 25}
        });
        const actual = impact.get("publicTraffic");
        expect(actual!.gC02eq).toBe(expected);
        expect(actual!.kWh).toBe(0);
    });
});

