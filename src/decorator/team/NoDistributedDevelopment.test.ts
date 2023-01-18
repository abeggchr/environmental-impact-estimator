import {describe, expect, test} from 'vitest'
import {testTeam} from "../../testing/testTeam";
import {NoDistributedDevelopment} from "./NoDistributedDevelopment";

describe('NoDistributedDevelopment', () => {
    test('decorates distribution', () => {
        const sut = new NoDistributedDevelopment({teams: [testTeam]});
        const actual = sut.teams[0];
        expect(actual.distribution_percentage.mainLocation).toBe(1);
        expect(actual.distribution_percentage.remoteLocation).toBe(0);
        expect(actual.teamName).toBe(testTeam.teamName);
    });
});