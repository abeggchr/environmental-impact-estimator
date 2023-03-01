export interface IMachine {

    virtualCPUs_number: number;

    ssdStorage_gb: number;

    hddStorage_gb: number;

    duration_years: number;

    hourlyCpuUtilizationOverAverageDay_percentage: number[];

    hourlyTrafficOverAverageDay_gb: number[];

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