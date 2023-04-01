import {describe, expect, test} from 'vitest'
import {testTeam} from "../testing/testTeam";
import {testMachine} from "../testing/testMachine";
import {testUsage} from "../testing/testUsage";
import {OnlyHomeOffice} from "./OnlyHomeOffice";

describe('OnlyHomeOffice', () => {
    test('decorates workLocation_percentage', () => {
        const sut = new OnlyHomeOffice({
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
        expect(actual.home).toBe(1);
        expect(actual.office).toBe(0);
    });
});
