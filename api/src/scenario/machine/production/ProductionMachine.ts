import {Machine, UsageType, SeriesName} from "../Machine";

/**
 * The production environment consists of 3 servers:
 * - web server (requires 12 physical cores)
 * - db server (requires 8 physical cores, memory-intensive, storage)
 * - job server (requires 10 physical cores, compute-intensive)
 * - it is replicated twice
 * - there's a hot standby
 *
 * The baseline is a deployment of 3 virtual machines as recommended by the <a href='https://azure.microsoft.com/en-us/pricing/vm-selector'>Microsoft Azure VM selector tool</a> (and available at CCF):
 * - web server: VM "D16s_v4" (16 vCPU, 64GB RAM)
 * - db server: VM "E8as v5" (8 vCPU, 64GB RAM) + Premium SSD P15 (256 GB)
 * - job server: VM "F16s v2" (16 vCPU, 32GB RAM, 128GB temp storage)
 */
export abstract class ProductionMachine extends Machine {

    protected constructor(series: SeriesName, instanceType: UsageType) {
        super(series, instanceType);
    }

    duration_years = 10;

    ssdStorage_gb = 0;

    hddStorage_gb = 0;

    /**
     * StackExchange operates its servers on average below 10% CPU usage. Peaks result in up to 20% CPU usage.
     * Source: https://stackexchange.com/performance
     *
     * In this scenario we assume a European company working at daytime (6am until 6pm) with a 3hr peak over lunchtime (11am until 2pm).
     */
    hourlyCpuUtilizationOverBusinessDay_percentage = [...Array(12).fill(0), ...Array(9).fill(0.1), ...Array(3).fill(0.2)];

    hourlyCpuUtilizationOverNonBusinessDay_percentage = Array(24).fill(0);
    
    instances_number = 2;

    hasHotStandby_bool = true;
}