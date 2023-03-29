import {describe, expect, test} from 'vitest'
import {testTeam} from "../interfaces/testTeam";
import {testMachine} from "../interfaces/testMachine";
import {testUsage} from "../interfaces/testUsage";
import {ExtendHardwareLifespanBy1Year} from "./ExtendHardwareLifespanBy1Year";

describe('ExtendHardwareLifespanBy1Year', () => {
    test('decorates team, machines and usage', () => {
        const sut = new ExtendHardwareLifespanBy1Year({
            teams: [{...testTeam, workplaceExpectedLifespan_years: 1}],
            machines: [{...testMachine, expectedLifespan_years: 2}],
            usage: {...testUsage, workplaceExpectedLifespan_years: 3}
        });

        expect(sut.teams[0].workplaceExpectedLifespan_years).toBe(2);
        expect(sut.machines[0].expectedLifespan_years).toBe(3);
        expect(sut.usage.workplaceExpectedLifespan_years).toBe(4);
    });
});
