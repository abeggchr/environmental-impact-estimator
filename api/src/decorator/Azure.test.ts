import {describe, expect, test} from 'vitest'
import {testTeam} from "../interfaces/testTeam";
import {testMachine} from "../interfaces/testMachine";
import {testUsage} from "../interfaces/testUsage";
import {Azure} from "./Azure";
import {AZURE_CLOUD_CONSTANTS, AZURE_EMISSIONS_FACTORS_METRIC_TON_PER_KWH} from "@cloud-carbon-footprint/azure";

describe('Azure', () => {
    test('decorates machine pue', () => {
        const sut = new Azure({
            teams: [testTeam],
            machines: [{...testMachine, powerUsageEffectiveness_factor: 2}],
            usage: testUsage
        });
        expect(sut.machines[0].powerUsageEffectiveness_factor).toBe(AZURE_CLOUD_CONSTANTS.PUE_AVG);
    });

    test('does not decorate machine pue if value would increase', () => {
        const sut = new Azure({
            teams: [testTeam],
            machines: [{...testMachine, powerUsageEffectiveness_factor: 0.5}],
            usage: testUsage
        });
        expect(sut.machines[0].powerUsageEffectiveness_factor).toBe(0.5);
    });

    test('decorates machine emission factor', () => {
        const sut = new Azure({
            teams: [testTeam],
            machines: [{...testMachine, emissionFactor_gC02eqPerkWh: 100}],
            usage: testUsage
        });
        expect(sut.machines[0].emissionFactor_gC02eqPerkWh).toBe(AZURE_EMISSIONS_FACTORS_METRIC_TON_PER_KWH['switzerland'] * 1000 * 1000);
    });

    test('does not decorates machine emission factor if value would increase', () => {
        const sut = new Azure({
            teams: [testTeam],
            machines: [{...testMachine, emissionFactor_gC02eqPerkWh: 0.1}],
            usage: testUsage
        });
        expect(sut.machines[0].emissionFactor_gC02eqPerkWh).toBe(0.1);
    });
});
