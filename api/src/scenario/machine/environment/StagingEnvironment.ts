import {DbProductionMachine} from "../production/DbProductionMachine";
import {JobProductionMachine} from "../production/JobProductionMachine";
import {WebProductionMachine} from "../production/WebProductionMachine";
import {Environment} from "./Environment";

/**
 * Staging environment is dimensioned like the production environment. Differences are:
 * - there is not hot-standby
 * - it has another usage pattern
 * - it is used during development and usage phase
 */
export class StagingEnvironment extends Environment {

    public constructor() {
        super([new WebProductionMachine(), new DbProductionMachine(), new JobProductionMachine()], _ => 1);
    }


    machineName = 'staging-environment';

    /**
     * 1h performance test per day (full utilization).
     * 4h of users testing per day (a bit more than no utilization).
     */
    hourlyCpuUtilizationOverBusinessDay_percentage = [1, ...Array(4).fill(0.05), ...Array(19).fill(0)];
    hourlyCpuUtilizationOverNonBusinessDay_percentage = Array(24).fill(0);

    duration_years = 10;
}