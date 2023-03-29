import {describe, expect, test} from 'vitest'
import {testTeam} from "../interfaces/testTeam";
import {testMachine} from "../interfaces/testMachine";
import {testUsage} from "../interfaces/testUsage";
import {Cloud} from "./Cloud";
import {AZURE_CLOUD_CONSTANTS, AZURE_EMISSIONS_FACTORS_METRIC_TON_PER_KWH} from "@cloud-carbon-footprint/azure";
import {CLOUD_EMISSION_FACTOR} from "./GreenEnergy";
import {ReduceIndividualTrafficBy25Percent} from "./ReduceIndividualTrafficBy25Percent";

describe('ScaleToZero', () => {
    test('decorates daily running hours', () => {
        const sut = new ReduceIndividualTrafficBy25Percent({
            teams: [testTeam],
            machines: [testMachine],
            usage: testUsage
        });

        const actual = sut.teams[0].commuteModalSplit_percentage;
        expect(actual.individualTrafficCombustion).toBe(0.3);
        expect(actual.individualTrafficElectric).toBe(0.3);
        expect(actual.individualTrafficSlow).toBe(0.1);
        expect(actual.publicTraffic).toBe(0.3);
    });
});
