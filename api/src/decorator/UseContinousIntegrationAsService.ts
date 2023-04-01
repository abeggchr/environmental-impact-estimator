import {ProjectDecorator} from "./ProjectDecorator";
import {IMachine} from "../interfaces/IMachine";
import {AZURE_CLOUD_CONSTANTS} from "@cloud-carbon-footprint/azure";
import {CLOUD_EMISSION_FACTOR} from "./UseGreenEnergy";
import {HOURS_PER_YEAR, MONTHS_PER_YEAR} from "../estimation/common/Constants";

/**
 * Use a SaaS solution for continous integration.
 *
 * The assumptions are:
 * - each developer requires 8h of 100% utilization per month for pipline runs (the AzureDevOps free tier has 1800min for pipeline runs which is about what a team of 4 needs)
 * - each developer requires 8h of 100% utilization per month for working per month with the UI: ticketing, boards, artifacts, pull requests...
 * - the same VMs are used in the SaaS solution
 *
 * This decorater decorates:
 * - only machines with the name "ci-environment"
 * - uses 100% utilization during business days
 * - scales to 0 during non business days
 * - adjusts the duration according to actual usage
 * - uses non business days as well (simplifies calculation)
 */
export class UseContinousIntegrationAsService extends ProjectDecorator {

    public static HOURS_PER_TEAMMEMBER_AND_MONTH = 16;

    protected override decorateMachine(machine: IMachine): IMachine {
        if (machine.machineName !== 'ci-environment') {
            return machine;
        }

        const manYears = this.project.teams.reduce((accumulator, project) => accumulator += (project.teamDistribution_nr.remoteLocation + project.teamDistribution_nr.mainLocation) * project.duration_years, 0);
        const duration = ((manYears * MONTHS_PER_YEAR * UseContinousIntegrationAsService.HOURS_PER_TEAMMEMBER_AND_MONTH)) / HOURS_PER_YEAR;

        return Object.assign(machine, {
            hourlyCpuUtilizationOverBusinessDay_percentage: Array(24).fill(1),
            hourlyCpuUtilizationOverNonBusinessDay_percentage: Array(24).fill(1),
            duration_years: duration
        });
    }
}