import {Impact} from "../Impact";
import {IMachine} from "../../interfaces/IMachine";
import {
    CloudConstants,
    CloudConstantsEmissionsFactors,
    ComputeEstimator,
    ComputeUsage,
    EmbodiedEmissionsEstimator,
    EmbodiedEmissionsUsage,
    FootprintEstimate,
    MemoryEstimator,
    MemoryUsage,
    NetworkingEstimator,
    NetworkingUsage,
    StorageEstimator,
    StorageUsage
} from "@cloud-carbon-footprint/core";
import _ from "lodash";
import {BUSINESS_DAYS_PER_YEAR, DAYS_PER_YEAR, HOURS_PER_DAY} from "../common/Constants";

/**
 * Estimates a virtual machine using the cloud carbon footprint tool.
 */
export class MachineEstimator {

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
        impact.add("computeOnBusinessDays", this.estimateBusinessDayComputeUsage(machine, emissionsFactors, constants));
        impact.add("computeOnNonBusinessDays", this.estimateNonBusinessDayComputeUsage(machine, emissionsFactors, constants));
        impact.add("ssdStorage", this.estimateSsdStorage(machine, emissionsFactors, constants));
        impact.add("hddStorage", this.estimateHddStorage(machine, emissionsFactors, constants));
        impact.add("network", this.estimateNetworkEmissions(machine, emissionsFactors, constants));
        impact.add("memory", this.estimateMemoryEmissions(machine, emissionsFactors, constants));
        impact.add("embodiedEmissions", this.estimateEmbodiedEmissions(machine, emissionsFactors));
        return impact;
    }

    private estimateBusinessDayComputeUsage(machine: IMachine, emissionsFactors: CloudConstantsEmissionsFactors, constants: CloudConstants) {
        if (machine.hourlyCpuUtilizationOverBusinessDay_percentage.length != 24) {
            throw new Error("expect 24 hours per day, but given argument has " + machine.hourlyCpuUtilizationOverBusinessDay_percentage.length);
        }
        const daysPerYear = DAYS_PER_YEAR - BUSINESS_DAYS_PER_YEAR;
        const usages: ComputeUsage[] = [];
        _.forOwn(_.groupBy(machine.hourlyCpuUtilizationOverBusinessDay_percentage), (value: number[]) => {
            usages.push({
                cpuUtilizationAverage: value[0] * 100, // cpuUtilization is a whole number (i.e. 50 and not 0.5)
                vCpuHours: machine.virtualCPUs_number * value.length,
                usesAverageCPUConstant: false, // no impact on estimation, just wired through
            });
        });

        return this.estimateComputeUsage(usages, BUSINESS_DAYS_PER_YEAR, machine, emissionsFactors, constants);
     }

    private estimateNonBusinessDayComputeUsage(machine: IMachine, emissionsFactors: CloudConstantsEmissionsFactors, constants: CloudConstants) {
        const daysPerYear = DAYS_PER_YEAR - BUSINESS_DAYS_PER_YEAR;
        const usages = [{
            cpuUtilizationAverage: machine.cpuUtilizationOnNonBusinessDay_percentage * 100, // cpuUtilization is a whole number (i.e. 50 and not 0.5)
            vCpuHours: machine.virtualCPUs_number * HOURS_PER_DAY ,
            usesAverageCPUConstant: false, // no impact on estimation, just wired through
        }];
        return this.estimateComputeUsage(usages, daysPerYear, machine, emissionsFactors, constants);
    }

    private estimateComputeUsage(usagesPerDay: ComputeUsage[], daysPerYear: number, machine: IMachine, emissionsFactors: CloudConstantsEmissionsFactors, constants: CloudConstants) {
        const estimator = new ComputeEstimator();
        const estimates = estimator.estimate(usagesPerDay, this.REGION, emissionsFactors, constants);
        const zombieFactor = 1 + machine.zombieServers_percentage;
        const usagesFormula = usagesPerDay.map(u => `(${u.cpuUtilizationAverage}% [avgUtilization], ${u.vCpuHours}h [vCPUh])`).join(', ');
        const formula = `estimation by cloud carbon footprint tool with: {${usagesFormula} [usages/d]}, ${constants.minWatts}W [min], ${constants.maxWatts}W [max], ${constants.powerUsageEffectiveness}% [pue], ${constants.replicationFactor} [replication factor], ${zombieFactor} [zombie factor], ${emissionsFactors[this.REGION]}gCO2eq/kWh [emission factor], ${machine.duration_years}y, ${daysPerYear}d/y`
        return this.asImpact(estimates, zombieFactor * daysPerYear * machine.duration_years, formula);
    }

    private estimateSsdStorage(machine: IMachine, emissionsFactors: CloudConstantsEmissionsFactors, constants: CloudConstants) {
        const terabyteHours = (machine.ssdStorage_gb / 1000) * machine.duration_years * DAYS_PER_YEAR * machine.dailyRunning_hours;
        const coefficient = machine.ssdCoefficient_whPerTBh;
        return this.estimateStorage(terabyteHours, coefficient!, machine, emissionsFactors, constants);
    }

    private estimateHddStorage(machine: IMachine, emissionsFactors: CloudConstantsEmissionsFactors, constants: CloudConstants) {
        const terabyteHours = (machine.hddStorage_gb / 1000) * machine.duration_years * DAYS_PER_YEAR * machine.dailyRunning_hours;
        const coefficient = machine.hddCoefficient_whPerTBh;
        return this.estimateStorage(terabyteHours, coefficient!, machine, emissionsFactors, constants);
    }

    private estimateNetworkEmissions(machine: IMachine, emissionsFactors: CloudConstantsEmissionsFactors, constants: CloudConstants) {
        const usage: NetworkingUsage = {
            gigabytes: machine.traffic_gbPerBusinessDay * machine.duration_years * BUSINESS_DAYS_PER_YEAR
        };
        const estimator = new NetworkingEstimator(machine.networkingCoefficient_kWhPerGb);
        const estimates = estimator.estimate([usage], this.REGION, emissionsFactors, constants);
        return this.asImpact(estimates, 1);
    }

    private estimateStorage(terabyteHours: number, coefficient: number, machine: IMachine, emissionsFactors: CloudConstantsEmissionsFactors, constants: CloudConstants) {
        const usage: StorageUsage = {
            terabyteHours: terabyteHours
        };
        const estimator = new StorageEstimator(coefficient);
        const estimates = estimator.estimate([usage], this.REGION, emissionsFactors, constants);
        return this.asImpact(estimates, 1 + machine.zombieServers_percentage);
    }

    private estimateMemoryEmissions(machine: IMachine, emissionsFactors: CloudConstantsEmissionsFactors, constants: CloudConstants) {
        const usage: MemoryUsage = {
            gigabyteHours: machine.memory_gb * machine.duration_years * DAYS_PER_YEAR * machine.dailyRunning_hours
        }
        const coefficient = machine.memoryCoefficient_kWhPerGb; // 0.000392 kWh / Gb
        const estimator = new MemoryEstimator(coefficient!);
        const estimates = estimator.estimate([usage], this.REGION, emissionsFactors, constants);
        return this.asImpact(estimates, 1 + machine.zombieServers_percentage);
    }

    private estimateEmbodiedEmissions(machine: IMachine, emissionsFactors: CloudConstantsEmissionsFactors) {
        const usage: EmbodiedEmissionsUsage = {
            instancevCpu: machine.virtualCPUs_number,
            largestInstancevCpu: machine.largestInstanceVirtualCPUs_number,
            usageTimePeriod: machine.duration_years,
            scopeThreeEmissions: machine.embodiedEmissions_gC02eq * machine.replication_factor
        };
        const estimator = new EmbodiedEmissionsEstimator(machine.expectedLifespan_years);
        const estimates = estimator.estimate([usage], this.REGION, emissionsFactors);
        return this.asImpact(estimates, 1 + machine.zombieServers_percentage);
    }

    private asImpact(estimates: FootprintEstimate[], factor: number, formula: string | undefined = undefined) {
        let gC02eq = 0;
        let defaultFormula = "estimation by cloud carbon footprint tool: (";
        for (let estimate of estimates) {
            gC02eq += estimate.co2e; // is in gC02e because emissionsFactors above is as well
            defaultFormula += `${estimate.co2e.toFixed()} gC02eq + `;
        }

        gC02eq *= factor;
        defaultFormula = defaultFormula.substring(0, defaultFormula.length - 3) + `) * ${factor} [zombieFactor]`;

        return new Impact(gC02eq, formula ? formula : defaultFormula);
    }
}