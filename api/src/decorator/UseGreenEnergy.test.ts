import {describe, expect, test} from 'vitest'
import {testTeam} from "../common/testing/testTeam";
import {testMachine} from "../common/testing/testMachine";
import {UseGreenEnergy} from "./UseGreenEnergy";
import {testUsage} from "../common/testing/testUsage";

describe('UseGreenEnergy', () => {
    test('decorates team and machine ', () => {
        const sut = new UseGreenEnergy({
            teams: [{...testTeam, emissionFactor_gC02eqPerKWh: { mainLocation: 100, remoteLocation: 100}}],
            machines: [{...testMachine, emissionFactor_gC02eqPerkWh: 100}],
            usage: {...testUsage, workplaceEmbodiedEmissions_gC02eq: 100}
        });

        expect(sut.teams[0].emissionFactor_gC02eqPerKWh.mainLocation).toBeLessThan(100);
        expect(sut.teams[0].emissionFactor_gC02eqPerKWh.remoteLocation).toBeLessThan(100);
        expect(sut.machines[0].emissionFactor_gC02eqPerkWh).toBeLessThan(100);
        expect(sut.usage.workplaceEmissionFactor_gC02eqPerKWh).toBeLessThan(100);
    });

    test('does not decorate traffic emission factor', () => {
        const sut = new UseGreenEnergy({
            teams: [testTeam],
            machines: [testMachine],
            usage: {...testUsage, trafficEmissionFactor_gC02eqPerKWh: 100}
        });

        expect(sut.usage.trafficEmissionFactor_gC02eqPerKWh).toBe(100);
    })

    test('does not decorate team and machine if emissionsFactor would increase', () => {
        const sut = new UseGreenEnergy({
            teams: [{...testTeam, emissionFactor_gC02eqPerKWh: { mainLocation: 0.1, remoteLocation: 0.1}}],
            machines: [{...testMachine, emissionFactor_gC02eqPerkWh: 0.1}],
            usage: {...testUsage, workplaceEmbodiedEmissions_gC02eq: 0.1}
        });

        expect(sut.teams[0].emissionFactor_gC02eqPerKWh.mainLocation).toBe(0.1);
        expect(sut.teams[0].emissionFactor_gC02eqPerKWh.remoteLocation).toBe(0.1);
        expect(sut.machines[0].emissionFactor_gC02eqPerkWh).toBe(0.1);
        expect(sut.usage.workplaceEmissionFactor_gC02eqPerKWh).toBeLessThan(100);
    });
});
