import {Impact} from "../Impact";
import {IMachine} from "./IMachine";
import {VirtualMachineEstimator} from "./VirtualMachineEstimator";
import {PhysicalMachineEstimator} from "./PhysicalMachineEstimator";

export class MachineEstimator {

    public calculate(machine: IMachine): Impact {
        let estimator;
        if (machine.isPhysicalMachine) {
            estimator = new PhysicalMachineEstimator();
        } else {
            estimator = new VirtualMachineEstimator();
        }
        return estimator.estimate(machine);
    }
}