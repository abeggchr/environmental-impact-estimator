import {describe, expect, test} from "vitest";
import {ElectricityEstimator} from "./ElectricityEstimator";
import {BUSINESS_DAYS_PER_YEAR} from "../common/Constants";
import {testUsage} from "../../common/testing/testUsage";
import {wattHoursToKiloWattHours} from "../../common/testing/unitConversion";

describe("ElectricityEstimator", () => {
    
    test("estimates main location impact", () => {
        const actual = new ElectricityEstimator().estimate({
            ...testUsage
        });

        const expected = wattHoursToKiloWattHours((testUsage.workplacePowerUsage_W * BUSINESS_DAYS_PER_YEAR * testUsage.duration_years * testUsage.usagePerUserAndBusinessDay_h)) * testUsage.users_nr * testUsage.workplaceEmissionFactor_gC02eqPerKWh;
        expect(actual!.gC02eq).toBe(expected);
    });
});

