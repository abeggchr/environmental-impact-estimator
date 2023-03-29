import {describe, expect, test} from 'vitest'
import {testTeam} from "../interfaces/testTeam";
import {testMachine} from "../interfaces/testMachine";
import {testUsage} from "../interfaces/testUsage";
import {UseCloud} from "./UseCloud";
import {AZURE_CLOUD_CONSTANTS} from "@cloud-carbon-footprint/azure";
import {CLOUD_EMISSION_FACTOR} from "./UseGreenEnergy";

describe('UseCloud', () => {
    test('decorates machine pue', () => {
        const sut = new UseCloud({
            teams: [testTeam],
            machines: [{...testMachine, powerUsageEffectiveness_factor: 2}],
            usage: testUsage
        });
        expect(sut.machines[0].powerUsageEffectiveness_factor).toBe(AZURE_CLOUD_CONSTANTS.PUE_AVG);
    });

    test('does not decorate machine pue if value would increase', () => {
        const sut = new UseCloud({
            teams: [testTeam],
            machines: [{...testMachine, powerUsageEffectiveness_factor: 0.5}],
            usage: testUsage
        });
        expect(sut.machines[0].powerUsageEffectiveness_factor).toBe(0.5);
    });

    test('decorates machine emission factor', () => {
        const sut = new UseCloud({
            teams: [testTeam],
            machines: [{...testMachine, emissionFactor_gC02eqPerkWh: 100}],
            usage: testUsage
        });
        expect(sut.machines[0].emissionFactor_gC02eqPerkWh).toBe(CLOUD_EMISSION_FACTOR);
    });

    test('does not decorates machine emission factor if value would increase', () => {
        const sut = new UseCloud({
            teams: [testTeam],
            machines: [{...testMachine, emissionFactor_gC02eqPerkWh: 0.1}],
            usage: testUsage
        });
        expect(sut.machines[0].emissionFactor_gC02eqPerkWh).toBe(0.1);
    });
});