import {IMachine} from "../estimation/machine/IMachine";

export const testMachine: IMachine = {
    duration_years: 1,
    embodiedEmissions_gC02eq: 2,
    emissionFactor_gC02eqPerkWh: 3,
    hourlyCpuUtilizationOverAverageDay: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    isPhysicalMachine: false,
    machineName: "machineName",
    maxWatts_W: 4,
    minWatts_W: 5,
    powerUsageEffectiveness_factor: 6,
    serverExpectedLifespan_years: 7,
    virtualCPUs_number: 8,
    zombieServers_percentage: 0.1
}