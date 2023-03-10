import {Environment} from "./Environment";
import {Machine} from "../Machine";

/**
 * A smaller dimensioned environment for developer tests.
 */
export class TestEnvironment extends Environment {

    public constructor() {
        super([new TestMachine(), new TestMachine(), new TestMachine()]);
    }

    machineName = 'test-environment';

    /**
     * 4h of testing per business day.
     */
    hourlyCpuUtilizationOverBusinessDay_percentage = [0.4, 0.4, 0.4, 0.4,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    duration_years = 8;

}

class TestMachine extends Machine {

    constructor() {
        super('Av2 Standard', 'A4 v2');
    }

    cpuUtilizationOnNonBusinessDay_percentage = 0;
    dailyRunning_hours = 24;
    duration_years = 8;
    hddStorage_gb = 0;
    ssdStorage_gb = 32;
    traffic_gbPerBusinessDay = 1;
    hourlyCpuUtilizationOverBusinessDay_percentage = []; // ignored in environment
    machineName = ''; // ignored in environment
    replication_factor = 0; // ignored in environment
}