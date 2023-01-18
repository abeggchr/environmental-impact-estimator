import {describe, expect, test} from 'vitest'
import {testTeam} from "../../testing/testTeam";
import {NoDistributedDevelopment} from "./NoDistributedDevelopment";

describe('NoDistributedDevelopment', () => {
    test('decorates distribution', () => {
        const sut = new NoDistributedDevelopment({teams: [testTeam]});
        const actual = sut.teams[0];
        expect(actual.teamDistribution_nr.mainLocation).toBe(5);
        expect(actual.teamDistribution_nr.remoteLocation).toBe(0);
        expect(actual.teamName).toBe(testTeam.teamName);
    });
});