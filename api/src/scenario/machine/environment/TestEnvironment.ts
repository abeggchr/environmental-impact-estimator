import {Machine} from "../Machine";

/**
 * Test environment consists of 3 test machines.
 */
export class TestEnvironment extends Machine {

    constructor() {
        super('Av2 Standard', 'A4 v2');
    }

    /**
     * 4h of testing per business day.
     */
    hourlyCpuUtilizationOverBusinessDay_percentage = [...Array(4).fill(0.4), ...Array(20).fill(0)];
    hourlyCpuUtilizationOverNonBusinessDay_percentage = Array(24).fill(0);
    machineName = 'test-environment';
    duration_years = 10;
    hddStorage_gb = 0;
    ssdStorage_gb = 32;
    traffic_gbPerBusinessDay = 1;
    replication_factor = 3;
}