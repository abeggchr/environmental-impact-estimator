import {describe, expect, test} from "vitest";
import {testTeam} from "../../testing/testTeam";
import {TravelCalculator} from "./TravelCalculator";

describe("TravelCalculator", () => {

    test("calculates travel emissions", () => {
        const impact = new TravelCalculator().calculate({
            ...testTeam,
            duration_years: 1,
            workingDays_perYear: 200,
            weeksBetweenTravels_nr: 6,
            distribution_percentage: {remoteLocation: 0.25, mainLocation: 0.75},
            teamSize_nr: 10,
            travelDistributionFrom_percentage: {remoteLocation: 0.6, mainLocation: 0.3},
            travelEmission_gC02eqPerOnewayTravel: 100
        });

        const expectedNumberOfTravels = (200 / TravelCalculator.WORKING_DAYS_PER_WEEK) / 6;
        const expectedNumberOfGroupTravelsFromMainToRemote = expectedNumberOfTravels * 0.3;
        const expectedNumberOfSingularTravelsFromMainToRemote = expectedNumberOfGroupTravelsFromMainToRemote * 0.75 * 10 * 2;
        const expectedNumberOfGroupTravelsFromRemoteToMain = expectedNumberOfTravels * 0.6;
        const expectedNumberOfSingularTravelsFromRemoteToMain = expectedNumberOfGroupTravelsFromRemoteToMain * 0.25 * 10 * 2;
        const expectedTotalOnewayTravels = expectedNumberOfSingularTravelsFromRemoteToMain + expectedNumberOfSingularTravelsFromMainToRemote;
        const expected = expectedTotalOnewayTravels * 100;

        expect(impact!.gC02eq).toBe(expected);
        expect(impact!.kWh).toBe(0);
    });
});

