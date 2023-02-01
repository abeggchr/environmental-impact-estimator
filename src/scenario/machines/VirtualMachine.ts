import {IMachine} from "../../estimation/machine/IMachine";

export abstract class VirtualMachine implements IMachine {
    abstract virtualCPUs_number: number;
    abstract duration_years: number;
    abstract isRunningAt_boolean: (hour: number) => boolean;
    abstract machineName: string;
    abstract embodiedEmissions: number;
    abstract maxWatts_W: number;
    abstract minWatts_W: number;


    isPhysicalMachine = false;

    /**
     * AZURE_REGIONS.EU_SWITZERLAND: 0.00001152 metric tons per kWH
     * Source: AzureFootprintEstimationConstants from cloud-carbon-footprint tool.
     */
    emissionFactor_gC02eq = 11.52;

    /**
     * Quote: "the data shows that about thirty percent of the virtual machines [...] were [...] comatose"
     * Source: https://www.anthesisgroup.com/wp-content/uploads/2019/11/Comatose-Servers-Redux-2017.pdf
     */
    zombieServers_percentage = 0.3;

    /**
     * 4 years according to `AzureFootprintCalculationConstants` in the cloud-carbon-footprint tool
     */
    serverExpectedLifespan_years = 4;
    /**
     * AZURE_CLOUD_CONSTANTS.PUE_AVG
     * Source: AzureFootprintEstimationConstants from cloud-carbon-footprint tool.
     */
    powerUsageEffectiveness_factor: number = 1.185;

    abstract getCpuUtilizationAt_percentage(hour: number): number;


}

