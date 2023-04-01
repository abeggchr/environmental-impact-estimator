import {describe, expect, test} from 'vitest'
import {testTeam} from "../common/testing/testTeam";
import {NoDistributedDevelopment} from "./NoDistributedDevelopment";
import {testMachine} from "../common/testing/testMachine";

describe('NoDistributedDevelopment', () => {
    test('decorates distribution', () => {
        const sut = new NoDistributedDevelopment({teams: [{...testTeam, teamDistribution_nr: { mainLocation: 2, remoteLocation: 3}}], machines: [testMachine]});
        const actual = sut.teams[0];
        expect(actual.teamDistribution_nr.mainLocation).toBe(5);
        expect(actual.teamDistribution_nr.remoteLocation).toBe(0);
        expect(actual.teamName).toBe(testTeam.teamName);
    });
});