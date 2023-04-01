import {describe, expect, test} from 'vitest'
import {testTeam} from "../common/testing/testTeam";
import {testMachine} from "../common/testing/testMachine";
import {testUsage} from "../common/testing/testUsage";
import {NoHotStandby} from "./NoHotStandby";

describe('NoHotStandby', () => {
    test('decorates instances_number', () => {
        const sut = new NoHotStandby({
            teams: [testTeam],
            machines: [{
                ...testMachine,
                machineName: "some-production-machine",
                instances_number: 2
            }],
            usage: testUsage
        });

        expect(sut.machines[0].instances_number).toBe(1);
    });
});
