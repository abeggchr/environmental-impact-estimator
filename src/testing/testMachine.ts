import {IMachine} from "../estimation/machine/IMachine";

export const testMachine: IMachine = {
    duration_years: 1,
    embodiedEmissions: 2,
    emissionFactor_gC02eq: 3,
    getCpuUtilizationAt_percentage(hour: number): number {
        return hour;
    },
    isPhysicalMachine: false,
    isRunningAt_boolean(hour: number): boolean {
        return !!(hour % 2);
    },
    machineName: "machineName",
    maxWatts_W: 4,
    minWatts_W: 5,
    powerUsageEffectiveness_factor: 6,
    serverExpectedLifespan_years: 7,
    virtualCPUs_number: 8,
    zombieServers_percentage: 0.1

}