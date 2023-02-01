export interface IMachine {
    virtualCPUs_number: number;
    duration_years: number;

    hourlyCpuUtilizationOverAverageDay: number[];

    minWatts_W: number;
    maxWatts_W: number;
    powerUsageEffectiveness_factor: number;
    emissionFactor_gC02eqPerkWh: number;

    machineName: string;

    isPhysicalMachine: boolean;

    zombieServers_percentage: number;

    serverExpectedLifespan_years: number;

    embodiedEmissions: number;
}