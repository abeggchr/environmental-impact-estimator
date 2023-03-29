import {ProjectDecorator} from "./ProjectDecorator";
import {IMachine} from "../interfaces/IMachine";

export class NoZombieServers extends ProjectDecorator {

    protected override decorateMachine(machine: IMachine): IMachine {
        return Object.assign(machine, {
            zombieServers_percentage: 0
        });
    }
}