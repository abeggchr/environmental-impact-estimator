import {describe, expect, test} from "vitest";
import {testTeam} from "../../common/testing/testTeam";
import {BUSINESS_DAYS_PER_YEAR} from "../common/Constants";
import {FoodEstimator} from "./FoodEstimator";

describe("FoodEstimator", () => {
    test("estimates emissions per number of working days", () => {

        const impact = new FoodEstimator().estimate({
            ...testTeam,
            commuteDistance_km: 42,
            commuteEmission_gC02eqPerKm: {...testTeam.commuteEmission_gC02eqPerKm, individualTrafficCombustion: 100},
            commuteModalSplit_percentage: {...testTeam.commuteModalSplit_percentage, individualTrafficCombustion: 0.2}
        });

        const days = BUSINESS_DAYS_PER_YEAR * testTeam.duration_years * (testTeam.teamDistribution_nr.mainLocation + testTeam.teamDistribution_nr.remoteLocation);
        expect(impact.gC02eq).toBe(days * FoodEstimator.EMISSIONS_PER_LUNCH_GCO2);
    });
});

