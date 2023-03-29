import {WebProductionMachine} from "../production/WebProductionMachine";

export class WebStagingMachine extends WebProductionMachine {
    machineName = "web-staging";
    traffic_gbPerBusinessDay = 0; // is neglected
    hourlyCpuUtilizationOverBusinessDay_percentage = [1, ...Array(4).fill(0.05), ...Array(19).fill(0)];
    hourlyCpuUtilizationOverNonBusinessDay_percentage = Array(24).fill(0);
    duration_years = 10;
}