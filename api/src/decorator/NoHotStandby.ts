import {ProjectDecorator} from "./ProjectDecorator";
import {IMachine} from "../interfaces/IMachine";

export class NoHotStandby extends ProjectDecorator {

    protected override decorateMachine(machine: IMachine): IMachine {
        if (machine.instances_number === 2 && machine.machineName.includes("production")) {
            return Object.assign(machine, {
                instances_number: 1
            });
        }

        return machine;
    }
}