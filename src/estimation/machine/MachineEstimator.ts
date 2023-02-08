import {Impact} from "../Impact";
import {IMachine} from "./IMachine";
import {CloudConstants, CloudConstantsEmissionsFactors, ComputeEstimator} from "@cloud-carbon-footprint/core";
import _ from "lodash";
import {
    ComputeUsage,
    EmbodiedEmissionsEstimator,
    EmbodiedEmissionsUsage,
    FootprintEstimate
} from "@cloud-carbon-footprint/core/src";

export class MachineEstimator {
    private readonly DAYS_PER_YEAR = 360;
    private readonly REGION = "region";


    public calculate(machine: IMachine): Impact {
        if (machine.isPhysicalMachine) {
            throw new Error("not implemented");
        } else {
            return this.calculateCloudImpact(machine);
        }
    }

    private calculateCloudImpact(machine: IMachine) {
        const emissionsFactors: CloudConstantsEmissionsFactors = {
            [this.REGION]: machine.emissionFactor_gC02eqPerkWh
        };

        const constants: CloudConstants = {
            maxWatts: machine.maxWatts_W,
            minWatts: machine.minWatts_W,
            powerUsageEffectiveness: machine.powerUsageEffectiveness_factor,
            replicationFactor: machine.replication_factor,
        };

        const impact = new Impact();
        impact.add("compute", this.estimateComputeUsage(machine, emissionsFactors, constants));
        impact.add("embodiedEmissions", this.estimateEmbodiedEmissions(machine, emissionsFactors));
        return impact;
    }

    private estimateComputeUsage(machine: IMachine, emissionsFactors: CloudConstantsEmissionsFactors, constants: CloudConstants) {
        const usages = this.getComputeUsage(machine);
        const estimator = new ComputeEstimator();
        const estimates = estimator.estimate(usages, this.REGION, emissionsFactors, constants);
        return this.asImpact(estimates, 1 + machine.zombieServers_percentage);
    }

    private estimateEmbodiedEmissions(machine: IMachine, emissionsFactors: CloudConstantsEmissionsFactors) {
        const usage: EmbodiedEmissionsUsage = {
            instancevCpu: machine.virtualCPUs_number,
            largestInstancevCpu: machine.largestInstanceVirtualCPUs_number,
            usageTimePeriod: machine.duration_years,
            scopeThreeEmissions: machine.embodiedEmissions_gC02eq
        };
        console.log(usage);
        const estimator = new EmbodiedEmissionsEstimator(machine.serverExpectedLifespan_years);
        const estimates = estimator.estimate([usage], this.REGION, emissionsFactors);
        return this.asImpact(estimates, 1 + machine.zombieServers_percentage);
    }

    private asImpact(estimates: FootprintEstimate[], factor: number) {
        let kWh = 0;
        let gC02eq = 0;
        for (let estimate of estimates) {
            kWh += estimate.kilowattHours;
            gC02eq += estimate.co2e; // is in gC02e because emissionsFactors above is as well
        }

        kWh *= factor;
        gC02eq *= factor;

        return new Impact(kWh, gC02eq);
    }

    private getComputeUsage(machine: IMachine): ComputeUsage[] {
        if (machine.hourlyCpuUtilizationOverAverageDay.length != 24) {
            throw new Error("expect 24 hours per day, but given argument has " + machine.hourlyCpuUtilizationOverAverageDay.length);
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