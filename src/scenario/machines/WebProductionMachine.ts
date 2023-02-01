import {ProductionMachine} from "./ProductionMachine";

/**
 * The web server uses a "D16 v5" Azure VM (16 vCPU, Ice Lake processor, 64GB RAM).
 */
export class WebProductionMachine extends ProductionMachine {

    virtualCPUs_number = 16;

    machineName = "web-production";

    /**
     * Source: azure/../VirtualMachineTypes in cloud-carbon-footprint
     */
    embodiedEmissions = 1.5104;

    /**
     * AZURE_CLOUD_CONSTANTS.MAX_WATTS_AVG = 3.54
     * As there is no definition for ICE_LAKE processors in AzureFootprintEstimationConstants.
     */
    maxWatts_W = 3.54;

    /**
     * AZURE_CLOUD_CONSTANTS.MIN_WATTS_AVG = 0.74
     * As there is no definition for ICE_LAKE processors in AzureFootprintEstimationConstants.
     */
    minWatts_W = 0.74;
}