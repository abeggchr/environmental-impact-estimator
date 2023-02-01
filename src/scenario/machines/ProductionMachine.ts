import {VirtualMachine} from "./VirtualMachine";

/**
 * The production environment consists of 3 servers:
 * - web server (requires 12 physical cores)
 * - db server (requires 8 physical cores, memory-intensive, storage)
 * - job server (requires 10 physical cores, compute-intensive)
 *
 * The baseline is a deployment of 3 virtual machines as recommended by the <a href='https://azure.microsoft.com/en-us/pricing/vm-selector'>Microsoft Azure VM selector tool</a>:
 * - web server: VM "D16 v5" (16 vCPU, 64GB RAM)
 * - db server: VM "E8as v5" (8 vCPU, 64GB RAM) + Premium SSD P15 (256 GB)
 * - job server: VM "F16s v2" (16 vCPU, 32GB RAM, 128GB temp storage)
 */
export abstract class ProductionMachine extends VirtualMachine {

    duration_years = 8;

    /**
     * StackExchange operates its servers on average below 10% CPU usage. Peaks result in up to 20% CPU usage.
     * Source: https://stackexchange.com/performance
     *
     * In this scenario we assume a European company working at daytime (6am until 6pm) with a 3hr peak over lunchtime (11am until 2pm).
     */
    getCpuUtilizationAt_percentage = (hour: number) => {
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

    isRunningAt_boolean = (hour: number) => {
        return true;
    }
}