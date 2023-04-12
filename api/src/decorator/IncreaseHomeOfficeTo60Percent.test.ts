import {describe, expect, test} from 'vitest'
import {testTeam} from "../common/testing/testTeam";
import {testMachine} from "../common/testing/testMachine";
import {testUsage} from "../common/testing/testUsage";
import {IncreaseHomeOfficeTo60Percent} from "./IncreaseHomeOfficeTo60Percent";

describe('IncreaseHomeOfficeTo60Percent', () => {
    test('decorates workLocation_percentage', () => {
        const sut = new IncreaseHomeOfficeTo60Percent({
            teams: [{
                ...testTeam, workLocation_percentage: {
                    home: 0.5,
                    office: 0.5
                }
            }],
            machines: [testMachine],
            usage: testUsage
        });

        const actual = sut.teams[0].workLocation_percentage;
        expect(actual.home).toBe(0.6);
        expect(actual.office).toBe(0.4);
    });
});
