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
import { convertGigaBytesToTerabyteHours } from "@cloud-carbon-footprint/common";
import _ from "lodash";
import {BUSINESS_DAYS_PER_YEAR, DAYS_PER_YEAR, HOURS_PER_DAY, HOURS_PER_YEAR} from "../common/Constants";

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

        const uptime_hoursPerBusinessDay = machine.hourlyCpuUtilizationOverBusinessDay_percentage.length;
        const uptime_hoursPerNonBusinessDay = machine.hourlyCpuUtilizationOverNonBusinessDay_percentage.length;
        const uptime_avgHoursPerDay = (5* uptime_hoursPerBusinessDay + 2*uptime_hoursPerNonBusinessDay)/7;

        const impact = new Impact();
        impact.add("computeOnBusinessDays", this.estimateComputeUsage(machine.hourlyCpuUtilizationOverBusinessDay_percentage, BUSINESS_DAYS_PER_YEAR, machine, emissionsFactors, constants));
        impact.add("computeOnNonBusinessDays", this.estimateComputeUsage(machine.hourlyCpuUtilizationOverNonBusinessDay_percentage, DAYS_PER_YEAR - BUSINESS_DAYS_PER_YEAR, machine, emissionsFactors, constants));
        impact.add("ssdStorage", this.estimateSsdStorage(machine, emissionsFactors, constants, uptime_avgHoursPerDay));
        impact.add("hddStorage", this.estimateHddStorage(machine, emissionsFactors, constants, uptime_avgHoursPerDay));
        impact.add("network", this.estimateNetworkEmissions(machine, emissionsFactors, constants));
        impact.add("memory", this.estimateMemoryEmissions(machine, emissionsFactors, constants, uptime_avgHoursPerDay));
        impact.add("embodiedEmissions", this.estimateEmbodiedEmissions(machine, emissionsFactors));
        return impact;
    }

    private estimateComputeUsage(hourlyCpuUtilizationOverDay_percentage: number[], daysPerYear: number, machine: IMachine, emissionsFactors: CloudConstantsEmissionsFactors, constants: CloudConstants) {
        const usagesPerDay: ComputeUsage[] = [];
        _.forOwn(_.groupBy(hourlyCpuUtilizationOverDay_percentage), (value: number[]) => {
            usagesPerDay.push({
                cpuUtilizationAverage: value[0] * 100, // cpuUtilization is a whole number (i.e. 50 and not 0.5)
                vCpuHours: machine.virtualCPUs_number * value.length,
                usesAverageCPUConstant: false, // no impact on estimation, just wired through
            });
        });

        const estimator = new ComputeEstimator();
        const estimates = estimator.estimate(usagesPerDay, this.REGION, emissionsFactors, constants);
        const zombieFactor = 1 + machine.zombieServers_percentage;
        const usagesFormula = usagesPerDay.map(u => `(${u.cpuUtilizationAverage}% [avgUtilization], ${u.vCpuHours}h [vCPUh])`).join(', ');
        const formula = `estimation by cloud carbon footprint tool with: {${usagesFormula} [usages/d]}, ${constants.minWatts}W [min], ${constants.maxWatts}W [max], ${constants.powerUsageEffectiveness}% [pue], ${constants.replicationFactor} [replication factor], ${zombieFactor} [zombie factor], ${emissionsFactors[this.REGION]}gCO2eq/kWh [emission factor], ${machine.duration_years}y, ${daysPerYear}d/y`
        return this.asImpact(estimates, zombieFactor * daysPerYear * machine.duration_years, formula);
    }

    private estimateSsdStorage(machine: IMachine, emissionsFactors: CloudConstantsEmissionsFactors, constants: CloudConstants, uptime_avgHoursPerDay: number) {
        const terabyteHours = convertGigaBytesToTerabyteHours(machine.ssdStorage_gb) * machine.duration_years * DAYS_PER_YEAR * (uptime_avgHoursPerDay / HOURS_PER_DAY);
        const coefficient = machine.ssdCoefficient_whPerTBh;
        return this.estimateStorage(terabyteHours, coefficient!, machine, emissionsFactors, constants);
    }

    private estimateHddStorage(machine: IMachine, emissionsFactors: CloudConstantsEmissionsFactors, constants: CloudConstants, uptime_avgHoursPerDay:number) {
        const terabyteHours = convertGigaBytesToTerabyteHours(machine.hddStorage_gb) * machine.duration_years * DAYS_PER_YEAR * (uptime_avgHoursPerDay / HOURS_PER_DAY);
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

    private estimateMemoryEmissions(machine: IMachine, emissionsFactors: CloudConstantsEmissionsFactors, constants: CloudConstants, uptime_avgHoursPerDay: number) {
        const usage: MemoryUsage = {
            gigabyteHours: machine.memory_gb * uptime_avgHoursPerDay * DAYS_PER_YEAR * machine.duration_years
        }
        const coefficient = machine.memoryCoefficient_kWhPerGb; // for Azure: 0.000392 kWh / Gb, see AZURE_CLOUD_CONSTANTS.MEMORY_COEFFICIENT
        const estimator = new MemoryEstimator(coefficient!);
        const estimates = estimator.estimate([usage], this.REGION, emissionsFactors, constants);
        return this.asImpact(estimates, 1 + machine.zombieServers_percentage);
    }

    private estimateEmbodiedEmissions(machine: IMachine, emissionsFactors: CloudConstantsEmissionsFactors) {
        const usage: EmbodiedEmissionsUsage = {
            instancevCpu: machine.virtualCPUs_number,
            largestInstancevCpu: machine.largestInstanceVirtualCPUs_number,
            usageTimePeriod: machine.duration_years, // y
            scopeThreeEmissions: machine.embodiedEmissions_gC02eq * machine.replication_factor // g
        };
        const estimator = new EmbodiedEmissionsEstimator(machine.expectedLifespan_years); // y
        const estimates = estimator.estimate([usage], this.REGION, emissionsFactors); // emission factor: gC02eqPerkWh
        return this.asImpact(estimates, 1 + machine.zombieServers_percentage);
    }

    private asImpact(estimates: FootprintEstimate[], zombieFactor: number, formula: string | undefined = undefined) {
        let gC02eq = 0;
        let defaultFormula = "estimation by cloud carbon footprint tool: (";
        for (let estimate of estimates) {
            gC02eq += estimate.co2e; // is in gC02e because emissionsFactors above is as well
            defaultFormula += `${estimate.co2e.toFixed()} gC02eq + `;
        }

        gC02eq *= zombieFactor;
        defaultFormula = defaultFormula.substring(0, defaultFormula.length - 3) + `) * ${zombieFactor} [zombieFactor]`;

        return new Impact(gC02eq, formula ? formula : defaultFormula);
    }
}