import {describe, expect, test} from 'vitest'
import {testTeam} from "../../testing/testTeam";
import {testMachine} from "../../testing/testMachine";
import {GreenEnergy} from "./GreenEnergy";

describe('GreenEnergy', () => {
    test('decorates team and machine', () => {
        const sut = new GreenEnergy({
            teams: [{...testTeam, emissionFactor_gC02eqPerKWh: { mainLocation: 100, remoteLocation: 100}}],
            machines: [{...testMachine, emissionFactor_gC02eqPerkWh: 100}]
        });
        expect(sut.teams[0].emissionFactor_gC02eqPerKWh.mainLocation).toBeLessThan(100);
        expect(sut.teams[0].emissionFactor_gC02eqPerKWh.remoteLocation).toBeLessThan(100);
        expect(sut.machines[0].emissionFactor_gC02eqPerkWh).toBeLessThan(100);
    });
});
