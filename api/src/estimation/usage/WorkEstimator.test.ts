import {describe, expect, test} from "vitest";
import {testTeam} from "../../testing/testTeam";
import {WorkEstimator} from "./WorkEstimator";
import {BUSINESS_DAYS_PER_YEAR} from "../common/Constants";
import {testUsage} from "../../testing/testUsage";

describe("WorkEstimator", () => {
    
    test("estimates main location impact", () => {
        const actual = new WorkEstimator().estimate({
            ...testUsage
        });

        const expected = ((testUsage.workplacePowerUsage_W * BUSINESS_DAYS_PER_YEAR * testUsage.duration_years * testUsage.usagePerUserAndBusinessDay_h) / 1000) * testUsage.users_nr * testUsage.workplaceEmissionFactor_gC02eqPerKWh;
        expect(actual!.gC02eq).toBe(expected);
    });
});

