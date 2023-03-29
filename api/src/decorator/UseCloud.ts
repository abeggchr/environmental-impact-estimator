import {ProjectDecorator} from "./ProjectDecorator";
import {IMachine} from "../interfaces/IMachine";
import {AZURE_CLOUD_CONSTANTS} from "@cloud-carbon-footprint/azure";
import {CLOUD_EMISSION_FACTOR} from "./UseGreenEnergy";

/**
 * Hosting the virtual machines in the Azure cloud.
 */
export class UseCloud extends ProjectDecorator {

    private static PUE = AZURE_CLOUD_CONSTANTS.PUE_AVG;

    protected override decorateMachine(machine: IMachine): IMachine {
        return Object.assign(machine, {
            powerUsageEffectiveness_factor: Math.min(UseCloud.PUE, machine.powerUsageEffectiveness_factor),
            emissionFactor_gC02eqPerkWh: Math.min(CLOUD_EMISSION_FACTOR, machine.emissionFactor_gC02eqPerkWh)
        });
    }
}