import {IProject} from "../estimation/IProject";
import {ITeam} from "../estimation/team/ITeam";
import {IMachine} from "../estimation/machine/IMachine";

export class ProjectDecorator implements IProject {

    constructor(private project: IProject) {
    }

    get teams() {
        return this.project.teams.map(t => this.decorateTeam(t));
    };

    get machines() {
        return this.project.machines.map(m => this.decorateMachine(m));
    }

    protected decorateTeam(team: ITeam): ITeam {
        return team;
    }

    protected decorateMachine(machine: IMachine): IMachine {
        return machine;
    }
}