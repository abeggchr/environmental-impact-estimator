import {Impact} from "./Impact";
import {TeamEstimator} from "./team/TeamEstimator";
import {IProject} from "../interfaces/IProject";
import {MachineEstimator} from "./machine/MachineEstimator";
import {UsageEstimator} from "./usage/UsageEstimator";

export class ProjectEstimator {

    constructor(private teamEstimator = new TeamEstimator(), private machineEstimator = new MachineEstimator(), private usageEstimator = new UsageEstimator()) {
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

        const usageImpact = this.usageEstimator.estimate(project.usage);
        impact.add("usage", usageImpact);

        return impact;
    }
}