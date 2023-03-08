import {ITeam} from "../estimation/team/ITeam";
import {DevelopmentTeam} from "./team/DevelopmentTeam";
import {MaintenanceTeam} from "./team/MaintenanceTeam";
import {IProject} from "../estimation/IProject";
import {IMachine} from "../estimation/machine/IMachine";
import {WebProductionMachine} from "./machine/WebProductionMachine";
import {BaselineUsage} from "./usage/BaselineUsage";
import {IUsage} from "../estimation/usage/IUsage";

export class BaselineProject implements IProject {

    constructor() {
        this._teams.push(new DevelopmentTeam());
        this._teams.push(new MaintenanceTeam());
        this._machines.push(new WebProductionMachine());
        this._usage = new BaselineUsage();
    }

    private _teams: ITeam[] = [];
    private _machines: IMachine[] = [];
    private readonly _usage: IUsage;

    get teams() {
        return this._teams;
    }

    get machines() {
        return this._machines;
    }

    get usage() {
        return this._usage;
    }
}
