import {IMachine} from "./IMachine";

export const testMachine: IMachine = {
    cpuUtilizationOnNonBusinessDay_percentage: 17,
    networkingCoefficient_kWhPerGb: 18,
    duration_years: 1,
    embodiedEmissions_gC02eq: 2,
    emissionFactor_gC02eqPerkWh: 3,
    hourlyCpuUtilizationOverBusinessDay_percentage: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    traffic_gbPerBusinessDay: 1,
    isPhysicalMachine: false,
    machineName: "machineName",
    maxWatts_W: 4,
    minWatts_W: 5,
    powerUsageEffectiveness_factor: 6,
    expectedLifespan_years: 7,
    virtualCPUs_number: 8,
    zombieServers_percentage: 0.1,
    largestInstanceVirtualCPUs_number: 10,
    replication_factor: 9,
    hddStorage_gb: 10,
    ssdStorage_gb: 11,
    dailyRunning_hours: 12,
    hddCoefficient_whPerTBh: 13,
    memoryCoefficient_kWhPerGb: 14,
    memory_gb: 15,
    ssdCoefficient_whPerTBh: 16
}