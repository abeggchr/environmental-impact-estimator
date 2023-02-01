export interface IEnvironment {

    environmentName: string;

    /**
     * @param hour 0-23
     */
    utilization_percentage: (hour: number) => number;
    zombieServers_percentage: number;

    serverExpectedLifespan_years: number;
}