import {describe, expect, test} from 'vitest'
import {testTeam} from "../common/testing/testTeam";
import {testUsage} from "../common/testing/testUsage";
import {Machine, SeriesName, UsageType} from "../scenario/machine/Machine";
import {DoubleUtilization} from "./DoubleUtilization";
import {ReduceMemoryBy50Percent} from "./ReduceMemoryBy50Percent";

describe('ReduceMemoryBy50Percent', () => {
    test('creates a machine half as powerful as the given machine with the most RAM', () => {
        const machine = new UnitTestMachine("Av2 Standard", "A4m v2");

        const sut = new ReduceMemoryBy50Percent({
            teams: [testTeam],
            machines: [machine],
            usage: testUsage
        });

        const actual = sut.machines[0] as Machine;

        expect(actual.seriesName).toBe("Av2 Standard");
        expect(actual.usageType).toBe("A8 v2");
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
    ssdStorage_gb = 2;
    traffic_gbPerBusinessDay = 1;
    instances_number = 4;
    hasHotStandby_bool = false;
}
