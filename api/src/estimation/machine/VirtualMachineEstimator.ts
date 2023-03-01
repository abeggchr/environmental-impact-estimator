import {Impact} from "../Impact";
import {IMachine} from "./IMachine";
import {CloudConstants, CloudConstantsEmissionsFactors, ComputeEstimator} from "@cloud-carbon-footprint/core";
import _ from "lodash";
import {
    ComputeUsage,
    EmbodiedEmissionsEstimator,
    EmbodiedEmissionsUsage,
    FootprintEstimate
} from "@cloud-carbon-footprint/core";
import {StorageEstimator, StorageUsage} from "@cloud-carbon-footprint/core/dist";
import {AZURE_CLOUD_CONSTANTS} from "@cloud-carbon-footprint/azure";

export class VirtualMachineEstimator {
    private readonly DAYS_PER_YEAR = 360;
    private readonly HOURS_PER_DAY = 24;
    private readonly REGION = "region";

    public estimate(machine: IMachine) {
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
        impact.add("ssdStorage", this.estimateSsdStorage(machine, emissionsFactors, constants));
        impact.add("hddStorage", this.estimateHddStorage(machine, emissionsFactors, constants));
        impact.add("embodiedEmissions", this.estimateEmbodiedEmissions(machine, emissionsFactors));
        return impact;
    }

    private estimateComputeUsage(machine: IMachine, emissionsFactors: CloudConstantsEmissionsFactors, constants: CloudConstants) {
        const usages = this.getComputeUsage(machine);
        const estimator = new ComputeEstimator();
        const estimates = estimator.estimate(usages, this.REGION, emissionsFactors, constants);
        return this.asImpact(estimates, 1 + machine.zombieServers_percentage);
    }

    private estimateSsdStorage(machine: IMachine, emissionsFactors: CloudConstantsEmissionsFactors, constants: CloudConstants) {
        const terabyteHours = (machine.ssdStorage_gb / 1000) * machine.duration_years * this.DAYS_PER_YEAR * this.HOURS_PER_DAY;
        const coefficient = AZURE_CLOUD_CONSTANTS.SSDCOEFFICIENT;
        return this.estimateStorage(terabyteHours, coefficient!, machine, emissionsFactors, constants);
    }

    private estimateHddStorage(machine: IMachine, emissionsFactors: CloudConstantsEmissionsFactors, constants: CloudConstants) {
        const terabyteHours = (machine.hddStorage_gb / 1000) * machine.duration_years * this.DAYS_PER_YEAR * this.HOURS_PER_DAY;
        const coefficient = AZURE_CLOUD_CONSTANTS.HDDCOEFFICIENT;
        return this.estimateStorage(terabyteHours, coefficient!, machine, emissionsFactors, constants);
    }

    private estimateStorage(terabyteHours: number, coefficient: number , machine: IMachine, emissionsFactors: CloudConstantsEmissionsFactors, constants: CloudConstants) {
        const usage: StorageUsage = {
            terabyteHours: terabyteHours
        };
        const estimator = new StorageEstimator(coefficient);
        const estimates = estimator.estimate([usage], this.REGION, emissionsFactors, constants);
        return this.asImpact(estimates, 1 + machine.zombieServers_percentage);
    }

    private estimateEmbodiedEmissions(machine: IMachine, emissionsFactors: CloudConstantsEmissionsFactors) {
        const usage: EmbodiedEmissionsUsage = {
            instancevCpu: machine.virtualCPUs_number,
            largestInstancevCpu: machine.largestInstanceVirtualCPUs_number,
            usageTimePeriod: machine.duration_years,
            scopeThreeEmissions: machine.embodiedEmissions_gC02eq
        };
        const estimator = new EmbodiedEmissionsEstimator(machine.expectedLifespan_years);
        const estimates = estimator.estimate([usage], this.REGION, emissionsFactors);
        return this.asImpact(estimates, 1 + machine.zombieServers_percentage);
    }

    private asImpact(estimates: FootprintEstimate[], factor: number) {
        let gC02eq = 0;
        let formula = "estimation by cloud carbon footprint tool: (";
        for (let estimate of estimates) {
            gC02eq += estimate.co2e; // is in gC02e because emissionsFactors above is as well
            formula += `${estimate.co2e}gC02eq + `;
        }

        gC02eq *= factor;
        formula = formula.substring(0, formula.length-3) + `) * ${factor} [factor for zombieServer]`;

        return new Impact(gC02eq, formula);
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