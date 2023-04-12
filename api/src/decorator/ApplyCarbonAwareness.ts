import {ProjectDecorator} from "./ProjectDecorator";
import {ITeam} from "../interfaces/ITeam";
import {IMachine} from "../interfaces/IMachine";
import {IUsage} from "../interfaces/IUsage"
import {EmissionFactor} from "../common/EmissionFactor";

export class ApplyCarbonAwareness extends ProjectDecorator {

    protected override decorateMachine(machine: IMachine): IMachine {
        if (machine.machineName === 'job-production') {
            return Object.assign(machine, {
                emissionFactor_gC02eqPerkWh: EmissionFactor.CARBON_AWARE
            });
        } else {
            return machine;
        }
    }
}