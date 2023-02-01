import {Impact} from "./Impact";
import {TeamEstimator} from "./team/TeamEstimator";
import {IProject} from "./IProject";
import {MachineEstimator} from "./machine/MachineEstimator";

export class ProjectEstimator {

    constructor(private teamEstimator = new TeamEstimator(), private machineEstimator = new MachineEstimator()) {
    }

    public calculate(project: IProject): Impact {
        const impact = new Impact();
        for (let team of project.teams) {
            impact.add(team.teamName, this.teamEstimator.calculate(team));
        }
        for (let machine of project.machines) {
            impact.add(machine.machineName, this.machineEstimator.calculate(machine));
        }
        return impact;
    }
}