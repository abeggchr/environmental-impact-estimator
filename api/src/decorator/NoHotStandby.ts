import {ProjectDecorator} from "./ProjectDecorator";
import {IMachine} from "../interfaces/IMachine";

export class NoHotStandby extends ProjectDecorator {

    protected override decorateMachine(machine: IMachine): IMachine {
        if (machine.hasHotStandby_bool) {
            if (machine.instances_number === 2) {
                return Object.assign(machine, {
                    instances_number: 1,
                    hasHotStandby_bool: false
                });
            } else {
                throw new Error("not implemented");
            }
        }

        return machine;
    }
}