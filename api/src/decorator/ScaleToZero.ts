import {ProjectDecorator} from "./ProjectDecorator";
import {IMachine} from "../interfaces/IMachine";

/**
 * Shut machines down, if cpu utilization is 0.
 */
export class ScaleToZero extends ProjectDecorator {

    protected override decorateMachine(machine: IMachine): IMachine {
        const hourlyCpuUtilizationOverBusinessDay_percentage = machine.hourlyCpuUtilizationOverBusinessDay_percentage.filter(u => u > 0);
        const hourlyCpuUtilizationOverNonBusinessDay_percentage = machine.hourlyCpuUtilizationOverNonBusinessDay_percentage.filter(u => u > 0);

        return Object.assign(machine, {
            hourlyCpuUtilizationOverBusinessDay_percentage,
            hourlyCpuUtilizationOverNonBusinessDay_percentage
        });
    }
}