import {IMachine} from "../../interfaces/IMachine";
import {AZURE_CLOUD_CONSTANTS} from "@cloud-carbon-footprint/azure";
import {
    INSTANCE_TYPE_COMPUTE_PROCESSOR_MAPPING,
    VIRTUAL_MACHINE_TYPE_SERIES_MAPPING
} from "@cloud-carbon-footprint/azure/dist/lib/VirtualMachineTypes";
import {DAYS_PER_YEAR, HOURS_PER_DAY} from "../../estimation/common/Constants";
import {EmissionFactor} from "../../common/EmissionFactor";

export type SeriesName = "D2s – D64s v4" | "E2as – E96as v5" | "Fsv2-series" | "Av2 Standard";
export type UsageType = "D16s v4" | "E8as v5"|"F16s v2" | "A4 v2" | "A2m v2" | "A4m v2" | "A8 v2";

/**
 * An on-premise virtual machine based on a virtual machine available in Azure.
 */
export abstract class Machine implements IMachine {

    private readonly virtualMachine: number[]; // [vcpus, memory, embodied emissions]
    private readonly computeProcessors: string[];
    public static VIRTUAL_MACHINE_INDEX = {
        VCPU: 0,
        MEMORY: 1,
        SCOPE_THREE_EMISSIONS: 2,
    };

    protected constructor(public seriesName: SeriesName, public usageType: UsageType) {
       this.virtualMachine = VIRTUAL_MACHINE_TYPE_SERIES_MAPPING[seriesName][usageType];
       this.computeProcessors = INSTANCE_TYPE_COMPUTE_PROCESSOR_MAPPING[usageType];
    }

    abstract duration_years: number;
    abstract machineName: string;
    abstract hourlyCpuUtilizationOverBusinessDay_percentage: number[];
    abstract hourlyCpuUtilizationOverNonBusinessDay_percentage: number[];
    abstract hasHotStandby_bool: boolean;
    abstract traffic_gbPerBusinessDay: number;
    abstract instances_number: number;
    abstract ssdStorage_gb: number;
    abstract hddStorage_gb: number;

    get virtualCPUs_number() { return this.virtualMachine[Machine.VIRTUAL_MACHINE_INDEX.VCPU] }

    get memory_gb() { return this.virtualMachine[Machine.VIRTUAL_MACHINE_INDEX.MEMORY]; };

    get scopeThreeEmissions_gC02eq() { return this.virtualMachine[Machine.VIRTUAL_MACHINE_INDEX.SCOPE_THREE_EMISSIONS] * 1_000_000 };

    get maxWatts_W() { return AZURE_CLOUD_CONSTANTS.getMaxWatts(this.computeProcessors)};

    get minWatts_W() { return AZURE_CLOUD_CONSTANTS.getMinWatts(this.computeProcessors)};

    get largestInstanceVirtualCPUs_number() {
        const seriesInstanceTypes = Object.values(VIRTUAL_MACHINE_TYPE_SERIES_MAPPING[this.seriesName]);
        let largestInstancevCpu;
        [largestInstancevCpu] = seriesInstanceTypes[seriesInstanceTypes.length - 1];
        return largestInstancevCpu;
    }

    /**
     * Baseline is the SWITZERLAND region regular grid emission factor.
     * Azures actual emission factor is applied with the "GreenEnergy" decorator for better comparability.
     */
    emissionFactor_gC02eqPerkWh = EmissionFactor.SWITZERLAND_CONSUMPTION;

    /**
     * Quote: "the data shows that about thirty percent of the virtual machines [...] were [...] comatose"
     * Source: https://www.anthesisgroup.com/wp-content/uploads/2019/11/Comatose-Servers-Redux-2017.pdf
     */
    zombieServers_percentage = 0.3;

    /**
     * 4 years
     */
    expectedLifespan_years = AZURE_CLOUD_CONSTANTS.SERVER_EXPECTED_LIFESPAN! / (DAYS_PER_YEAR * HOURS_PER_DAY);

    /**
     * "In a survey we carried out for the report noted above, European enterprises cited on average a PUE of 2.1"
     * Source: https://www.spglobal.com/marketintelligence/en/news-insights/research/improving-datacenter-efficiency-in-europe-the-role-of-pue
     */
    powerUsageEffectiveness_factor: number = 2.1;
    ssdCoefficient_whPerTBh: number = AZURE_CLOUD_CONSTANTS.SSDCOEFFICIENT!;
    hddCoefficient_whPerTBh: number = AZURE_CLOUD_CONSTANTS.HDDCOEFFICIENT!;
    memoryCoefficient_kWhPerGb: number = AZURE_CLOUD_CONSTANTS.MEMORY_COEFFICIENT!; // 0.000392, // kWh / Gb
    networkingCoefficient_kWhPerGb: number = AZURE_CLOUD_CONSTANTS.NETWORKING_COEFFICIENT!;
}

