import {Impact} from "../Impact";
import {IMachine} from "./IMachine";
import {
    CloudConstants,
    CloudConstantsEmissionsFactors,
    ComputeEstimator,
    ComputeUsage
} from "@cloud-carbon-footprint/core";


export class MachineEstimator {
    private readonly DAYS_PER_YEAR = 360;

    constructor(
        private computeEstimator = new ComputeEstimator()) {
    }

    public calculate(machine: IMachine): Impact {
        if (machine.isPhysicalMachine) {
            throw new Error("not implemented");
        } else {
            return this.calculateCloudImpact(machine);
        }
    }

    private calculateCloudImpact(machine: IMachine) {

        const emissionsFactors: CloudConstantsEmissionsFactors = {
            region: machine.emissionFactor_gC02eq / 1_000_000
        };
        const constants: CloudConstants = {
            maxWatts: machine.maxWatts_W,
            minWatts: machine.minWatts_W,
            powerUsageEffectiveness: machine.powerUsageEffectiveness_factor,
            replicationFactor: 1,
        };
        const computeUsage: ComputeUsage = {
            cpuUtilizationAverage: this.calculateAverageCpuUtilization(machine),
            vCpuHours: this.calculateVirtualCpuHours(machine),
            usesAverageCPUConstant: false, // no impact on estimation, just wired through
        };

        const computeEstimate = this.computeEstimator.estimate([computeUsage], "region", emissionsFactors, constants);
        console.log(computeEstimate);


        return new Impact();

    }

    private calculateAverageCpuUtilization(machine: IMachine) {
        let dividend = 0;
        let divisor = 0;
        for (let i = 0; i < 24; i++) {
            dividend += machine.getCpuUtilizationAt_percentage(i);
            divisor += machine.isRunningAt_boolean(i) ? 1 : 0;
        }
        return dividend / divisor;
    }

    private calculateVirtualCpuHours(machine: IMachine) {
        let hoursPerDay = 0;
        for (let i = 0; i < 24; i++) {
            hoursPerDay += machine.isRunningAt_boolean(i) ? 1 : 0;
        }
        return hoursPerDay * machine.virtualCPUs_number * this.DAYS_PER_YEAR * machine.duration_years;
    }
}