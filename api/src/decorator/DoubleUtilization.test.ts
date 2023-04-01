import {describe, expect, test} from 'vitest'
import {testTeam} from "../common/testing/testTeam";
import {testUsage} from "../common/testing/testUsage";
import {Machine, SeriesName, UsageType} from "../scenario/machine/Machine";
import {DoubleUtilization} from "./DoubleUtilization";

describe('DoubleUtilization', () => {
    test('creates a machine half as powerful as the given machine with the most RAM', () => {
        const machine = new UnitTestMachine("Av2 Standard", "A4m v2");

        const sut = new DoubleUtilization({
            teams: [testTeam],
            machines: [machine],
            usage: testUsage
        });

        const actual = sut.machines[0] as Machine;

        expect(actual.seriesName).toBe("Av2 Standard");
        expect(actual.usageType).toBe("A2m v2");
    });

    test('doubles utilization', () => {
        const machine = new UnitTestMachine("Av2 Standard", "A4m v2");

        const sut = new DoubleUtilization({
            teams: [testTeam],
            machines: [machine],
            usage: testUsage
        });

        const actual = sut.machines[0];
        expect(actual.hourlyCpuUtilizationOverBusinessDay_percentage).toEqual(machine.hourlyCpuUtilizationOverBusinessDay_percentage.map(u => u * 2));
        expect(actual.hourlyCpuUtilizationOverNonBusinessDay_percentage).toEqual(machine.hourlyCpuUtilizationOverNonBusinessDay_percentage.map(u => u * 2));
    });

    test('does not change other attributes', () => {
        const machine = new UnitTestMachine("Av2 Standard", "A4m v2");

        const sut = new DoubleUtilization({
            teams: [testTeam],
            machines: [machine],
            usage: testUsage
        });

        const actual = sut.machines[0];
        expect(actual.duration_years).toBe(machine.duration_years);
        expect(actual.hddStorage_gb).toBe(machine.hddStorage_gb);
        expect(actual.replication_factor).toBe(machine.replication_factor);
        expect(actual.ssdStorage_gb).toBe(machine.ssdStorage_gb);
        expect(actual.traffic_gbPerBusinessDay).toBe(machine.traffic_gbPerBusinessDay);
    });
});

class UnitTestMachine extends Machine {

    constructor(seriesName: SeriesName, usageType: UsageType) {
        super(seriesName, usageType);
    }

    duration_years = 6;
    hddStorage_gb = 5;
    hourlyCpuUtilizationOverBusinessDay_percentage = Array(2).fill(2);
    hourlyCpuUtilizationOverNonBusinessDay_percentage = Array(1).fill(1);
    machineName = "unit-test-machine";
    replication_factor = 3;
    ssdStorage_gb = 2;
    traffic_gbPerBusinessDay = 1;
    instances_number = 4;
}
