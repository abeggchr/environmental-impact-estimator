import {Environment} from "./Environment";

/**
 * The production environment consists of 3 servers:
 * - webserver (12 cores)
 * - db server (8 cores)
 * - job server (10 cores)
 * The baseline is a deployment of 3 physical servers
 */
export class ProductionEnvironment extends Environment {

    environmentName = "production";

    /**
     * StackExchange operates its servers on average below 10% CPU usage. Peaks result in up to 20% CPU usage.
     * Source: https://stackexchange.com/performance
     *
     * In this scenario we assume a European company working at daytime (6am until 6pm) with a 3hr peak over lunchtime (11am until 2pm).
     */
    utilization_percentage(hour: number): number {
        const noUsageHours = [0, 1, 2, 3, 4, 5, 18, 19, 20, 21, 22, 23];
        const averageUsageHours = [6, 7, 8, 9, 10, 14, 15, 16, 17];
        const peakUsageHours = [11, 12, 13];

        if (noUsageHours.includes(hour)) {
            return 0;
        }
        if (averageUsageHours.includes(hour)) {
            return 0.1;
        }
        if (peakUsageHours.includes(hour)) {
            return 0.2;
        }

        throw new Error(`Hour '${hour}' not implemented.`);
    }


}