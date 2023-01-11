import {describe, expect, test} from "vitest";
import {CommuteCalculator} from "./CommuteCalculator";
import {testTeam} from "./testTeam";

describe("CommuteCalculator", () => {
    test("calculates individual traffic combustion impact", () => {
        const expected = 1 * 0.25 * 42 * 100 * 0.5;
        const impact = new CommuteCalculator().calculate({
            ...testTeam,
            commuteDistance_km: 42,
            commuteEmission_gC02eqPerKm: {...testTeam.commuteEmission_gC02eqPerKm, individualTrafficCombustion: 100}
        });
        const actual = impact.get("individualTrafficCombustion");
        expect(actual!.gC02eq).toBe(expected);
        expect(actual!.kWh).toBe(0);
    });

    test("calculates individual traffic slow impact", () => {
        const expected = 1 * 0.25 * 42 * 50 * 0.5;
        const impact = new CommuteCalculator().calculate({
            ...testTeam,
            commuteDistance_km: 42,
            commuteEmission_gC02eqPerKm: {...testTeam.commuteEmission_gC02eqPerKm, individualTrafficSlow: 50}
        });
        const actual = impact.get("individualTrafficSlow");
        expect(actual!.gC02eq).toBe(expected);
        expect(actual!.kWh).toBe(0);
    });

    test("calculates individual traffic electric impact", () => {
        const expected = 1 * 0.25 * 84 * 25 * 0.5;
        const impact = new CommuteCalculator().calculate({
            ...testTeam,
            commuteDistance_km: 84,
            commuteEmission_gC02eqPerKm: {...testTeam.commuteEmission_gC02eqPerKm, individualTrafficElectric: 25}
        });
        const actual = impact.get("individualTrafficElectric");
        expect(actual!.gC02eq).toBe(expected);
        expect(actual!.kWh).toBe(0);
    });

    test("calculates public traffic impact", () => {
        const expected = 1 * 0.25 * 21 * 25 * 0.5;
        const impact = new CommuteCalculator().calculate({
            ...testTeam,
            commuteDistance_km: 21,
            commuteEmission_gC02eqPerKm: {...testTeam.commuteEmission_gC02eqPerKm, publicTraffic: 25}
        });
        const actual = impact.get("publicTraffic");
        expect(actual!.gC02eq).toBe(expected);
        expect(actual!.kWh).toBe(0);
    });
});

