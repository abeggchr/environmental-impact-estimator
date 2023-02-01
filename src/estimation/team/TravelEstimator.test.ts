import {describe, expect, test} from "vitest";
import {testTeam} from "../../testing/testTeam";
import {TravelEstimator} from "./TravelEstimator";

describe("TravelEstimator", () => {

    test("calculates travel emissions", () => {
        const impact = new TravelEstimator().calculate({
            ...testTeam,
            duration_years: 1,
            workingDays_perYear: 200,
            weeksBetweenTravels_nr: 6,
            teamDistribution_nr: {remoteLocation: 2.5, mainLocation: 7.5},
            travelDistributionFrom_percentage: {remoteLocation: 0.6, mainLocation: 0.3},
            travelEmission_gC02eqPerOnewayTravel: 100
        });

        const expectedNumberOfTravels = (200 / TravelEstimator.WORKING_DAYS_PER_WEEK) / 6;
        const expectedNumberOfGroupTravelsFromMainToRemote = expectedNumberOfTravels * 0.3;
        const expectedNumberOfSingularTravelsFromMainToRemote = expectedNumberOfGroupTravelsFromMainToRemote * 7.5 * 2;
        const expectedNumberOfGroupTravelsFromRemoteToMain = expectedNumberOfTravels * 0.6;
        const expectedNumberOfSingularTravelsFromRemoteToMain = expectedNumberOfGroupTravelsFromRemoteToMain * 2.5 * 2;
        const expectedTotalOnewayTravels = expectedNumberOfSingularTravelsFromRemoteToMain + expectedNumberOfSingularTravelsFromMainToRemote;
        const expected = expectedTotalOnewayTravels * 100;

        expect(impact!.gC02eq).toBe(expected);
        expect(impact!.kWh).toBe(0);
    });

    test("when team is not distributed, returns no emissions", () => {
        const impact = new TravelEstimator().calculate({
            ...testTeam,
            teamDistribution_nr: {remoteLocation: 0, mainLocation: 10}
        });

        expect(impact!.gC02eq).toBe(0);
        expect(impact!.kWh).toBe(0);
    });
});

