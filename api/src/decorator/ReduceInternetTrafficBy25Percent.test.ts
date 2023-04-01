import {describe, expect, test} from 'vitest'
import {testTeam} from "../common/testing/testTeam";
import {testMachine} from "../common/testing/testMachine";
import {testUsage} from "../common/testing/testUsage";
import {ReduceInternetTrafficBy25Percent} from "./ReduceInternetTrafficBy25Percent";

describe('ReduceInternetTrafficBy25Percent', () => {
    test('decorates modal split', () => {
        const sut = new ReduceInternetTrafficBy25Percent({
            teams: [testTeam],
            machines: [testMachine],
            usage: {...testUsage, initialRequest_gb: 100, additionalRequest_gb: 50}
        });

        const actual = sut.usage;
        expect(actual.initialRequest_gb).toBe(75);
        expect(actual.additionalRequest_gb).toBe(37.5);
    });
});
