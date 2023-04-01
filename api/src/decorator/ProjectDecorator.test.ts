import {describe, expect, test} from 'vitest'
import {testTeam} from "../common/testing/testTeam";
import {ProjectDecorator} from "./ProjectDecorator";
import {testMachine} from "../common/testing/testMachine";

describe('ProjectDecorator', () => {
    test('returns teams undecorated', () => {
        const sut = new ProjectDecorator({teams: [testTeam], machines: [testMachine]});
        const actual = sut.teams[0];
        expect(actual.teamName).toBe(testTeam.teamName);
        expect(actual.commuteEmission_gC02eqPerKm).toBe(testTeam.commuteEmission_gC02eqPerKm);
    });
});