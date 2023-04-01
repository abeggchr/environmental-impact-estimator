import {describe, expect, test} from 'vitest'
import {testTeam} from "../testing/testTeam";
import {testMachine} from "../testing/testMachine";
import {testUsage} from "../testing/testUsage";
import {ReduceIndividualTrafficBy25Percent} from "./ReduceIndividualTrafficBy25Percent";

describe('ReduceIndividualTrafficBy25Percent', () => {
    test('decorates modal split', () => {
        const sut = new ReduceIndividualTrafficBy25Percent({
            teams: [{...testTeam, commuteModalSplit_percentage: {
                    individualTrafficCombustion: 0.4,
                    individualTrafficElectric: 0.4,
                    individualTrafficSlow: 0.1,
                    publicTraffic: 0.1
            }
            }],
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
