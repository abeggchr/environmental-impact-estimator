import {IProject} from "../interfaces/IProject";
import {ITeam} from "../interfaces/ITeam";
import {IMachine} from "../interfaces/IMachine";
import {IUsage} from "../interfaces/IUsage";

export class ProjectDecorator implements IProject {

    constructor(protected project: IProject) {
    }

    get teams() {
        return this.project.teams.map(t => this.decorateTeam(t));
    };

    get machines() {
        return this.project.machines.map(m => this.decorateMachine(m));
    }

    get usage() {
        return this.decorateUsage(this.project.usage);
    }

    protected decorateTeam(team: ITeam): ITeam {
        return team;
    }

    protected decorateMachine(machine: IMachine): IMachine {
        return machine;
    }

    protected decorateUsage(usage: IUsage): IUsage {
        return usage;
    }
}