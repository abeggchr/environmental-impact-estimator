import {describe, expect, test} from 'vitest'
import {testTeam} from "../common/testing/testTeam";
import {testMachine} from "../common/testing/testMachine";
import {testUsage} from "../common/testing/testUsage";
import {ScaleToZero} from "./ScaleToZero";

describe('ScaleToZero', () => {
    test('decorates hourlyCpuUtilizationOverNonBusinessDay_percentage', () => {
        const sut = new ScaleToZero({
            teams: [testTeam],
            machines: [{...testMachine, hourlyCpuUtilizationOverNonBusinessDay_percentage: [...Array(18).fill(0), ...Array(6).fill(6)]}],
            usage: testUsage
        });

        const actual = sut.machines[0].hourlyCpuUtilizationOverNonBusinessDay_percentage;
        expect(actual.length).toBe(6);
    });

    test('decorates hourlyCpuUtilizationOverBusinessDay_percentage', () => {
        const sut = new ScaleToZero({
            teams: [testTeam],
            machines: [{...testMachine, hourlyCpuUtilizationOverBusinessDay_percentage: [...Array(12).fill(0), ...Array(12).fill(6)]}],
            usage: testUsage
        });

        const actual = sut.machines[0].hourlyCpuUtilizationOverBusinessDay_percentage;
        expect(actual.length).toBe(12);
    });
});
