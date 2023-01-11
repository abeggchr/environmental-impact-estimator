import {Impact} from "./Impact";
import {TeamCalculator} from "./team/TeamCalculator";
import {IProject} from "../scenario/IProject";

export class ProjectCalculator {

    constructor(private teamCalculator = new TeamCalculator()) {
    }

    public calculate(project: IProject): Impact {
        const teamsImpact = new Impact();
        for (let team of project.teams) {
            teamsImpact.add(team.teamName, this.teamCalculator.calculate(team));
        }

        return teamsImpact;
    }
}