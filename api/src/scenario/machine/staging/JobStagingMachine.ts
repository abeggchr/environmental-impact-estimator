import {JobProductionMachine} from "../production/JobProductionMachine";

export class JobStagingMachine extends JobProductionMachine {
    machineName = "job-staging";
    traffic_gbPerBusinessDay = 0; //is neglected
    hourlyCpuUtilizationOverBusinessDay_percentage = [1, ...Array(4).fill(0.05), ...Array(19).fill(0)];
    hourlyCpuUtilizationOverNonBusinessDay_percentage = Array(24).fill(0);
    duration_years = 10;
    instances_number = 1;
    hasHotStandby_bool = false;
}