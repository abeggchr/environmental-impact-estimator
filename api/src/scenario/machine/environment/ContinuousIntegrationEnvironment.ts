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

    public static MACHINE_NAME = 'ci-environment';

    constructor() {
        super('Av2 Standard', 'A2m v2');
    }

    /**
     * 40% load during office hours plus integration test (12h)
     */
    hourlyCpuUtilizationOverBusinessDay_percentage = [...Array(12).fill(0.4), ...Array(12).fill(0)];
    hourlyCpuUtilizationOverNonBusinessDay_percentage = Array(24).fill(0);
    machineName = ContinuousIntegrationEnvironment.MACHINE_NAME;
    duration_years = 10;
    hddStorage_gb = 0;
    ssdStorage_gb = 256;
    traffic_gbPerBusinessDay = 1;
    instances_number = 2;
    hasHotStandby_bool = false;
}