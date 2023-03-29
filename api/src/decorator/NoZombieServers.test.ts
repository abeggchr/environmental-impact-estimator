import {describe, expect, test} from 'vitest'
import {testTeam} from "../interfaces/testTeam";
import {testMachine} from "../interfaces/testMachine";
import {testUsage} from "../interfaces/testUsage";
import {Cloud} from "./Cloud";
import {AZURE_CLOUD_CONSTANTS, AZURE_EMISSIONS_FACTORS_METRIC_TON_PER_KWH} from "@cloud-carbon-footprint/azure";
import {CLOUD_EMISSION_FACTOR} from "./GreenEnergy";
import {ReduceIndividualTrafficBy25Percent} from "./ReduceIndividualTrafficBy25Percent";
import {ScaleToZero} from "./ScaleToZero";
import {NoZombieServers} from "./NoZombieServers";

describe('NoZombieServers', () => {
    test('decorates zombieServers_percentage', () => {
        const sut = new NoZombieServers({
            teams: [testTeam],
            machines: [{...testMachine, zombieServers_percentage: 0.3}],
            usage: testUsage
        });

        const actual = sut.machines[0].zombieServers_percentage;
        expect(actual).toBe(0);
    });
});
