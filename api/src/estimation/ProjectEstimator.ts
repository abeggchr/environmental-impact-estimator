import {Impact} from "./Impact";
import {TeamEstimator} from "./team/TeamEstimator";
import {IProject} from "./IProject";
import {MachineEstimator} from "./machine/MachineEstimator";

export class ProjectEstimator {

    constructor(private teamEstimator = new TeamEstimator(), private machineEstimator = new MachineEstimator()) {
    }

    public estimate(project: IProject): Impact {
        const impact = new Impact();

        const teamImpact = new Impact();
        for (let team of project.teams) {
            teamImpact.add(team.teamName, this.teamEstimator.estimate(team));
        }
        impact.add("team", teamImpact);

        const machineImpact = new Impact();
        for (let machine of project.machines) {
            machineImpact.add(machine.machineName, this.machineEstimator.estimate(machine));
        }
        impact.add("machine", machineImpact);

        return impact;
    }
}