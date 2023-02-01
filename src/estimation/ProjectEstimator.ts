import {Impact} from "./Impact";
import {TeamEstimator} from "./team/TeamEstimator";
import {IProject} from "./IProject";

export class ProjectEstimator {

    constructor(private teamCalculator = new TeamEstimator()) {
    }

    public calculate(project: IProject): Impact {
        const teamsImpact = new Impact();
        for (let team of project.teams) {
            teamsImpact.add(team.teamName, this.teamCalculator.calculate(team));
        }

        return teamsImpact;
    }
}