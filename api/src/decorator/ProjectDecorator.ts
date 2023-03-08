import {IProject} from "../estimation/IProject";
import {ITeam} from "../estimation/team/ITeam";
import {IMachine} from "../estimation/machine/IMachine";
import {IUsage} from "../estimation/usage/IUsage";

export class ProjectDecorator implements IProject {

    constructor(private project: IProject) {
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