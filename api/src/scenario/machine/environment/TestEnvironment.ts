import {Environment} from "./Environment";
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
    hourlyCpuUtilizationOverBusinessDay_percentage = [0.4, 0.4, 0.4, 0.4,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    machineName = 'test-environment';
    duration_years = 10;
    cpuUtilizationOnNonBusinessDay_percentage = 0;
    dailyRunning_hours = 24;
    hddStorage_gb = 0;
    ssdStorage_gb = 32;
    traffic_gbPerBusinessDay = 1;
    replication_factor = 3;
}