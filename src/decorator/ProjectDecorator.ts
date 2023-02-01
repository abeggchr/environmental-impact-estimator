import {IProject} from "../estimation/IProject";
import {ITeam} from "../estimation/team/ITeam";

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