export interface IMachine {
    virtualCPUs_number: number;
    duration_years: number;

    minWatts_W: number;
    maxWatts_W: number;
    powerUsageEffectiveness_factor: number;
    emissionFactor_gC02eq: number;

    machineName: string;

    isPhysicalMachine: boolean;

    /**
     * @param hour 0-23
     */
    getCpuUtilizationAt_percentage: (hour: number) => number;

    /**
     * @param hour 0-23
     */
    isRunningAt_boolean: (hour: number) => boolean;

    zombieServers_percentage: number;

    serverExpectedLifespan_years: number;

    embodiedEmissions: number;
}