import {describe, expect, test} from 'vitest'
import {testTeam} from "../testing/testTeam";
import {testMachine} from "../testing/testMachine";
import {testUsage} from "../testing/testUsage";
import {UseCloud} from "./UseCloud";
import {AZURE_CLOUD_CONSTANTS} from "@cloud-carbon-footprint/azure";
import {CLOUD_EMISSION_FACTOR} from "./UseGreenEnergy";
import {UseContinousIntegrationAsService} from "./UseContinousIntegrationAsService";
import {ContinuousIntegrationEnvironment} from "../scenario/machine/environment/ContinuousIntegrationEnvironment";
import {HOURS_PER_YEAR, MONTHS_PER_YEAR} from "../estimation/common/Constants";

describe('UseContinousIntegrationAsService', () => {

    test('decorates hourly utilization on business days', () => {
        const sut = new UseContinousIntegrationAsService({
            teams: [testTeam],
            machines: [{
                ...testMachine,
                machineName: ContinuousIntegrationEnvironment.MACHINE_NAME,
                hourlyCpuUtilizationOverBusinessDay_percentage: []
            }],
            usage: testUsage
        });
        expect(sut.machines[0].hourlyCpuUtilizationOverBusinessDay_percentage).toEqual(Array(24).fill(1));
    });

    test('decorates hourly utilization on non business days', () => {
        const sut = new UseContinousIntegrationAsService({
            teams: [testTeam],
            machines: [{
                ...testMachine,
                machineName: ContinuousIntegrationEnvironment.MACHINE_NAME,
                hourlyCpuUtilizationOverNonBusinessDay_percentage:[]
            }],
            usage: testUsage
        });
        expect(sut.machines[0].hourlyCpuUtilizationOverNonBusinessDay_percentage).toEqual(Array(24).fill(1));
    });

    test('decorates replication factor', () => {
        const sut = new UseContinousIntegrationAsService({
            teams: [{
                ...testTeam,
                teamDistribution_nr: { mainLocation: 2, remoteLocation: 3},
                duration_years: 4
            }],
            machines: [{
                ...testMachine,
                machineName: ContinuousIntegrationEnvironment.MACHINE_NAME}],
            usage: testUsage
        });

        var expected = ((((2+3) * 4 * MONTHS_PER_YEAR * UseContinousIntegrationAsService.HOURS_PER_TEAMMEMBER_AND_MONTH) / HOURS_PER_YEAR));

        expect(sut.machines[0].duration_years).toBe(expected);
    })
        ;
    });
