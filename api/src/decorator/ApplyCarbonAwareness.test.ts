import {describe, expect, test} from 'vitest'
import {testTeam} from "../common/testing/testTeam";
import {testMachine} from "../common/testing/testMachine";
import {UseGreenEnergy} from "./UseGreenEnergy";
import {testUsage} from "../common/testing/testUsage";
import {ApplyCarbonAwareness} from "./ApplyCarbonAwareness";
import {EmissionFactor} from "../common/EmissionFactor";

describe('ApplyCarbonAwareness', () => {
    test('decorates job-production machine ', () => {
        const sut = new ApplyCarbonAwareness({
            teams: [testTeam],
            machines: [{...testMachine, machineName: 'job-production'}],
            usage: testUsage
        });

        expect(sut.machines[0].emissionFactor_gC02eqPerkWh).toBe(EmissionFactor.CARBON_AWARE);
    });

    test('does not decorate non job-production machine ', () => {
        const sut = new ApplyCarbonAwareness({
            teams: [testTeam],
            machines: [{...testMachine, machineName: 'non-job-production'}],
            usage: testUsage
        });

        expect(sut.machines[0].emissionFactor_gC02eqPerkWh).toBe(testMachine.emissionFactor_gC02eqPerkWh);
    });
});
