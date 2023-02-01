import {Impact} from "../Impact";
import {IMachine} from "./IMachine";
import {CloudConstants, CloudConstantsEmissionsFactors, ComputeEstimator} from "@cloud-carbon-footprint/core";
import _ from "lodash";
import {ComputeUsage} from "@cloud-carbon-footprint/core/dist";

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
            region: machine.emissionFactor_gC02eqPerkWh
        };
        const constants: CloudConstants = {
            maxWatts: machine.maxWatts_W,
            minWatts: machine.minWatts_W,
            powerUsageEffectiveness: machine.powerUsageEffectiveness_factor,
            replicationFactor: 1,
        };

        const computeUsages = this.getComputeUsage(machine);
        const computeEstimates = this.computeEstimator.estimate(computeUsages, "region", emissionsFactors, constants);

        let kWh = 0;
        let gC02eq = 0;
        for (let computeEstimate of computeEstimates) {
            kWh += computeEstimate.kilowattHours;
            gC02eq += computeEstimate.co2e; // is in gC02e because emissionsFactors above is as well
        }

        return new Impact(kWh, gC02eq);
    }

    private getComputeUsage(machine:IMachine) {
        if (machine.hourlyCpuUtilizationOverAverageDay.length != 24) {
            throw new Error("expect 24 hours per day, but given argument has "+machine.hourlyCpuUtilizationOverAverageDay.length);
        }

        const usages: ComputeUsage[] = [];
        _.forOwn(_.groupBy(machine.hourlyCpuUtilizationOverAverageDay), (value: number[]) => {
            usages.push({
                cpuUtilizationAverage: value[0],
                vCpuHours: value.length * machine.virtualCPUs_number * this.DAYS_PER_YEAR * machine.duration_years,
                usesAverageCPUConstant: false, // no impact on estimation, just wired through
            });
        });

        return usages;
    }
}