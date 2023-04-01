import {describe, expect, test} from "vitest";
import {WorkEstimator} from "./WorkEstimator";
import {BUSINESS_DAYS_PER_YEAR} from "../common/Constants";
import {testUsage} from "../../common/testing/testUsage";
import {wattHoursToKiloWattHours} from "../../common/testing/unitConversion";

describe("WorkEstimator", () => {
    
    test("estimates main location impact", () => {
        const actual = new WorkEstimator().estimate({
            ...testUsage
        });

        const expected = wattHoursToKiloWattHours((testUsage.workplacePowerUsage_W * BUSINESS_DAYS_PER_YEAR * testUsage.duration_years * testUsage.usagePerUserAndBusinessDay_h)) * testUsage.users_nr * testUsage.workplaceEmissionFactor_gC02eqPerKWh;
        expect(actual!.gC02eq).toBe(expected);
    });
});

