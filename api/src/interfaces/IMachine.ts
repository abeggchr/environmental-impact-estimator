export interface IMachine {
    ssdCoefficient_whPerTBh: number;

    hddCoefficient_whPerTBh: number;

    memoryCoefficient_kWhPerGb: number;

    networkingCoefficient_kWhPerGb: number;

    virtualCPUs_number: number;

    ssdStorage_gb: number;

    hddStorage_gb: number;

    memory_gb: number;

    duration_years: number;

    hourlyCpuUtilizationOverBusinessDay_percentage: number[];

    cpuUtilizationOnNonBusinessDay_percentage: number;

    traffic_gbPerBusinessDay: number;

    dailyRunning_hours: number;

    minWatts_W: number;

    maxWatts_W: number;

    powerUsageEffectiveness_factor: number;

    emissionFactor_gC02eqPerkWh: number;

    machineName: string;

    isPhysicalMachine: boolean;

    zombieServers_percentage: number;

    expectedLifespan_years: number;

    embodiedEmissions_gC02eq: number;

    replication_factor: number;

    /**
     * the number of vcpu from the largest instance type in the family of VMs
     */
    largestInstanceVirtualCPUs_number: number;
}