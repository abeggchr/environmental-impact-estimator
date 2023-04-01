import {describe, expect, test} from "vitest";
import {testTeam} from "../../common/testing/testTeam";
import {FoodEstimator} from "./FoodEstimator";
import {totalWorkingDays} from "./totalWorkingDays";

describe("FoodEstimator", () => {
    test("estimates food emissions", () => {
        const impact = new FoodEstimator().estimate({
            ...testTeam,
            food_gCO2PerLunch: 42,
        });

        expect(impact.gC02eq).toBe(totalWorkingDays(testTeam) * 42);
    });
});

