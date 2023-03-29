import {Machine} from "../Machine";

/**
 * Continuous integration environment consists of 2 machines running AzureDevOps.
 *
 * Taken from real project:
 * - Each machine has 2vCPU, 16GB RAM and an 256GB SSD.
 * - There are 10 pipeline runs per team member and business day.
 * - Average pipeline run takes 20min.
 */
export class ContinuousIntegrationEnvironment extends Machine {

    constructor() {
        super('Av2 Standard', 'A2m v2');
    }

    /**
     * 40% load during office hours plus integration test (12h)
     */
    hourlyCpuUtilizationOverBusinessDay_percentage = [0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    machineName = 'ci-environment';
    duration_years = 10;
    cpuUtilizationOnNonBusinessDay_percentage = 0;
    dailyRunning_hours = 24;
    hddStorage_gb = 0;
    ssdStorage_gb = 256;
    traffic_gbPerBusinessDay = 1;
    replication_factor = 2;
}