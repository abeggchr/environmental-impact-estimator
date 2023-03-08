import {IMachine} from "../../estimation/machine/IMachine";
import {AZURE_CLOUD_CONSTANTS, AZURE_EMISSIONS_FACTORS_METRIC_TON_PER_KWH} from "@cloud-carbon-footprint/azure";
import {
    INSTANCE_TYPE_COMPUTE_PROCESSOR_MAPPING,
    VIRTUAL_MACHINE_TYPE_SERIES_MAPPING
} from "@cloud-carbon-footprint/azure/dist/lib/VirtualMachineTypes";
import {AZURE_REGIONS} from "@cloud-carbon-footprint/azure/dist/lib/AzureRegions";
import {DevelopmentTeam} from "../team/DevelopmentTeam";

export type SeriesName = "D2s – D64s v4";
export type UsageType = "D16s v4";

export abstract class AzureVirtualMachine implements IMachine {

    private readonly virtualMachine: number[]; // [vcpus, memory, embodied emissions]
    private readonly computeProcessors: string[];

    protected constructor(private seriesName: SeriesName, private usageType: UsageType) {
       this.virtualMachine = VIRTUAL_MACHINE_TYPE_SERIES_MAPPING[seriesName][usageType];
       this.computeProcessors = INSTANCE_TYPE_COMPUTE_PROCESSOR_MAPPING[usageType];
    }

    abstract duration_years: number;
    abstract machineName: string;
    abstract hourlyCpuUtilizationOverAverageDay_percentage: number[];
    abstract traffic_gbPerBusinessDay: number;
    abstract replication_factor: number;
    abstract ssdStorage_gb: number;
    abstract hddStorage_gb: number;
    abstract dailyRunning_hours: number;


    isPhysicalMachine = false;

    get virtualCPUs_number() { return this.virtualMachine[0] }

    get memory_gb() { return this.virtualMachine[1]; };

    get embodiedEmissions_gC02eq() { return this.virtualMachine[2] * 1000 };

    get maxWatts_W() { return AZURE_CLOUD_CONSTANTS.getMaxWatts(this.computeProcessors)};

    get minWatts_W() { return AZURE_CLOUD_CONSTANTS.getMinWatts(this.computeProcessors)};

    get largestInstanceVirtualCPUs_number() {
        const seriesInstanceTypes = Object.values(VIRTUAL_MACHINE_TYPE_SERIES_MAPPING[this.seriesName]);
        let largestInstancevCpu;
        [largestInstancevCpu] = seriesInstanceTypes[seriesInstanceTypes.length - 1];
        return largestInstancevCpu;
    }

    /**
     * Baseline is the SWITZERLAND region regular grid emission factor (see DevelopmentTeam
     * Azures actual emission factor is applied with the "GreenEnergy" decorator for better comparability.
     */
    emissionFactor_gC02eqPerkWh = DevelopmentTeam.Switzerland_EmissionFactor_gC02eqPerKWh;

    /**
     * Quote: "the data shows that about thirty percent of the virtual machines [...] were [...] comatose"
     * Source: https://www.anthesisgroup.com/wp-content/uploads/2019/11/Comatose-Servers-Redux-2017.pdf
     */
    zombieServers_percentage = 0.3;

    /**
     * 4 years
     */
    expectedLifespan_years = AZURE_CLOUD_CONSTANTS.SERVER_EXPECTED_LIFESPAN! / (365 * 24);

    /**
     * 1.185
     */
    powerUsageEffectiveness_factor: number = AZURE_CLOUD_CONSTANTS.PUE_AVG;
    ssdCoefficient_whPerTBh: number = AZURE_CLOUD_CONSTANTS.SSDCOEFFICIENT!;
    hddCoefficient_whPerTBh: number = AZURE_CLOUD_CONSTANTS.HDDCOEFFICIENT!;
    memoryCoefficient_kWhPerGb: number = AZURE_CLOUD_CONSTANTS.MEMORY_COEFFICIENT!;
    networkingCoefficient_kWhPerGb: number = AZURE_CLOUD_CONSTANTS.NETWORKING_COEFFICIENT!;
}

