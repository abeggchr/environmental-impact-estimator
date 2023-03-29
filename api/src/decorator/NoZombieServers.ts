import {ProjectDecorator} from "./ProjectDecorator";
import {IMachine} from "../interfaces/IMachine";
import {AZURE_CLOUD_CONSTANTS, AZURE_EMISSIONS_FACTORS_METRIC_TON_PER_KWH} from "@cloud-carbon-footprint/azure";
import {CLOUD_EMISSION_FACTOR} from "./GreenEnergy";

export class NoZombieServers extends ProjectDecorator {

    protected override decorateMachine(machine: IMachine): IMachine {
       return Object.assign(machine, {
           zombieServers_percentage: 0
        });
    }
}