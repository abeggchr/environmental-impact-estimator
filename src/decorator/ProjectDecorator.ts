import {IProject} from "../calculation/IProject";
import {ITeam} from "../calculation/team/ITeam";

export class ProjectDecorator implements IProject {

    constructor(private project: IProject) {
    }

    get teams() {
        return this.project.teams.map(t => this.decorateTeam(t));
    };

    protected decorateTeam(team: ITeam): ITeam {
        return team;
    }
}