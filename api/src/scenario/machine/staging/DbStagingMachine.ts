import {DbProductionMachine} from "../production/DbProductionMachine";

export class DbStagingMachine extends DbProductionMachine {
    machineName = "db-staging";
    traffic_gbPerBusinessDay = 0; //is neglected
    ssdStorage_gb = 256;
    hourlyCpuUtilizationOverBusinessDay_percentage = [1, ...Array(4).fill(0.05), ...Array(19).fill(0)];
    hourlyCpuUtilizationOverNonBusinessDay_percentage = Array(24).fill(0);
    duration_years = 10;
    instances_number = 1;
}