import {ProjectDecorator} from "./ProjectDecorator";
import {IMachine} from "../interfaces/IMachine";
import {AZURE_CLOUD_CONSTANTS, AZURE_EMISSIONS_FACTORS_METRIC_TON_PER_KWH} from "@cloud-carbon-footprint/azure";

/**
 * Hosting the virtual machines in the Azure cloud.
 */
export class Azure extends ProjectDecorator {

    private static PUE = AZURE_CLOUD_CONSTANTS.PUE_AVG;

    /**
     * 11.52 g C02 eq per kWh
     *
     * 'switzerland' = AZURE_REGIONS.EU_SWITZERLAND.name, cannot be resolved
     */
    private static EMISSION_FACTOR = AZURE_EMISSIONS_FACTORS_METRIC_TON_PER_KWH['switzerland'] * 1000 * 1000;

    protected override decorateMachine(machine: IMachine): IMachine {
        return Object.assign(machine, {
            powerUsageEffectiveness_factor: Math.min(Azure.PUE, machine.powerUsageEffectiveness_factor),
            emissionFactor_gC02eqPerkWh: Math.min(Azure.EMISSION_FACTOR, machine.emissionFactor_gC02eqPerkWh)
        });
    }
}