import {describe, expect, test} from "vitest";
import {InternetTrafficEstimator} from "./InternetTrafficEstimator";
import {testUsage} from "../../testing/testUsage";
import {BUSINESS_DAYS_PER_YEAR} from "../common/Constants";
import {IUsage} from "./IUsage";

describe("InternetTrafficEstimator", () => {
    test("estimates impact", () => {
        const usage: IUsage = {
            ...testUsage,
            users_nr: 100,
            duration_years: 2,
            initialRequest_gb: 1,
            additionalRequest_gb: 0.5,
            requestsPerBusinessDayAndUser_nr: 10,
            trafficCoefficient_kWhPerGb: 0.2,
            trafficEmissionFactor_gC02eqPerKWh: 1.1,
        };

        const impact = new InternetTrafficEstimator().estimate(usage);

        const expected = (usage.initialRequest_gb + (usage.additionalRequest_gb * usage.requestsPerBusinessDayAndUser_nr)) * BUSINESS_DAYS_PER_YEAR * usage.duration_years * usage.users_nr * usage.trafficCoefficient_kWhPerGb * usage.trafficEmissionFactor_gC02eqPerKWh;
        expect(impact.gC02eq).toBe(expected);
    });
});

