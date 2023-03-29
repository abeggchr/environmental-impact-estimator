import {describe, expect, test} from "vitest";
import {CommuteEstimator} from "./CommuteEstimator";
import {testTeam} from "../../interfaces/testTeam";
import {BUSINESS_DAYS_PER_YEAR} from "../common/Constants";
import {VideoconferenceEstimator} from "./VideoconferenceEstimator";
import {totalWorkingDays} from "./totalWorkingDays";

describe("VideoconferenceEstimator", () => {

    const workingDays = totalWorkingDays(testTeam);

    test("estimates videoconference impact in distributed setup", () => {
        const actual = new VideoconferenceEstimator().estimate({
            ...testTeam,
            teamDistribution_nr: {mainLocation: 1, remoteLocation: 2},
            workLocation_percentage: {office: 1, home: 0},
            videoconference_hoursPerVideoconferenceDayAndTeamMember: 4,
            videoconference_gC02eqPerHour: 5,
        });
        const expected = workingDays * 3 * 4 * 5;
        expect(actual.gC02eq).toBe(expected);
    });

    test("estimates videoconference impact in home office", () => {
        const actual = new VideoconferenceEstimator().estimate({
            ...testTeam,
            teamDistribution_nr: {mainLocation: 3, remoteLocation: 0},
            workLocation_percentage: {office: 0.5, home: 0.5},
            videoconference_hoursPerVideoconferenceDayAndTeamMember: 4,
            videoconference_gC02eqPerHour: 5,
        });
        const expected = workingDays  * 0.5 * 3 * 4 * 5;
        console.log(actual.formula);
        expect(actual.gC02eq).toBe(expected);
    });

    test("estimates videoconference impact when no distribution and no home office", () => {
        const actual = new VideoconferenceEstimator().estimate({
            ...testTeam,
            teamDistribution_nr: {mainLocation: 3, remoteLocation: 0},
            workLocation_percentage: {office: 1, home: 0},
            videoconference_hoursPerVideoconferenceDayAndTeamMember: 4,
            videoconference_gC02eqPerHour: 5,
        });
        expect(actual.gC02eq).toBe(0);
    });
});

