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
                instances_number: 2,
                hasHotStandby_bool: true
            }],
            usage: testUsage
        });

        expect(sut.machines[0].instances_number).toBe(1);
    });

    test('decorates hasHotStandby_bool', () => {
        const sut = new NoHotStandby({
            teams: [testTeam],
            machines: [{
                ...testMachine,
                instances_number: 2,
                hasHotStandby_bool: true
            }],
            usage: testUsage
        });

        expect(sut.machines[0].hasHotStandby_bool).toBe(false);
    });

    test('decorates nothing if no hot standby', () => {
        const sut = new NoHotStandby({
            teams: [testTeam],
            machines: [{
                ...testMachine,
                instances_number: 2,
                hasHotStandby_bool: false
            }],
            usage: testUsage
        });

        expect(sut.machines[0].instances_number).toBe(2);
        expect(sut.machines[0].hasHotStandby_bool).toBe(false);
    });
});
