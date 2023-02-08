import {IMachine} from "../../estimation/machine/IMachine";
import {AZURE_CLOUD_CONSTANTS, AZURE_EMISSIONS_FACTORS_METRIC_TON_PER_KWH} from "@cloud-carbon-footprint/azure/src";
import {AZURE_REGIONS} from "@cloud-carbon-footprint/azure/src/lib/AzureRegions";
import {
    INSTANCE_TYPE_COMPUTE_PROCESSOR_MAPPING,
    VIRTUAL_MACHINE_TYPE_SERIES_MAPPING
} from "@cloud-carbon-footprint/azure/src/lib/VirtualMachineTypes";

export type Series = "D2s – D64s v4";
export type InstanceType = "D16s v4";

export abstract class AzureVirtualMachine implements IMachine {

    private readonly virtualMachine: number[]; // [vcpus, memory, embodied emissions]
    private readonly computeProcessors: string[];

    protected constructor(private series: Series, private instanceType: InstanceType) {
       this.virtualMachine = VIRTUAL_MACHINE_TYPE_SERIES_MAPPING[series][instanceType];
       this.computeProcessors = INSTANCE_TYPE_COMPUTE_PROCESSOR_MAPPING[instanceType];
    }

    abstract duration_years: number;
    abstract machineName: string;
    abstract hourlyCpuUtilizationOverAverageDay: number[];

    isPhysicalMachine = false;

    get virtualCPUs_number() { return this.virtualMachine[0] }

    get embodiedEmissions() { return this.virtualMachine[2]};

    get maxWatts_W() { return AZURE_CLOUD_CONSTANTS.getMaxWatts(this.computeProcessors)};

    get minWatts_W() { return AZURE_CLOUD_CONSTANTS.getMinWatts(this.computeProcessors)};

    /**
     * 0.01152 g per kWh
     */
    emissionFactor_gC02eqPerkWh = AZURE_EMISSIONS_FACTORS_METRIC_TON_PER_KWH[AZURE_REGIONS.EU_SWITZERLAND.name] * 1000;

    /**
     * Quote: "the data shows that about thirty percent of the virtual machines [...] were [...] comatose"
     * Source: https://www.anthesisgroup.com/wp-content/uploads/2019/11/Comatose-Servers-Redux-2017.pdf
     */
    zombieServers_percentage = 0.3;

    /**
     * 4 years
     */
    serverExpectedLifespan_years = AZURE_CLOUD_CONSTANTS.SERVER_EXPECTED_LIFESPAN! / (365 * 24);

    /**
     * 1.185
     */
    powerUsageEffectiveness_factor: number = AZURE_CLOUD_CONSTANTS.PUE_AVG;
}

