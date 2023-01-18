import {describe, expect, test} from 'vitest'
import {testTeam} from "../testing/testTeam";
import {ProjectDecorator} from "./ProjectDecorator";

describe('ProjectDecorator', () => {
    test('returns teams undecorated', () => {
        const sut = new ProjectDecorator({teams: [testTeam]});
        const actual = sut.teams[0];
        expect(actual.teamName).toBe(testTeam.teamName);
        expect(actual.commuteEmission_gC02eqPerKm).toBe(testTeam.commuteEmission_gC02eqPerKm);
    });
});