import {ITeam} from "../estimation/team/ITeam";
import {DevelopmentTeam} from "./teams/DevelopmentTeam";
import {MaintenanceTeam} from "./teams/MaintenanceTeam";
import {IProject} from "../estimation/IProject";
import {IMachine} from "../estimation/machine/IMachine";
import {WebProductionMachine} from "./machines/WebProductionMachine";

export class BaselineProject implements IProject {

    constructor() {
        this._teams.push(new DevelopmentTeam());
        this._teams.push(new MaintenanceTeam());
        this._machines.push(new WebProductionMachine());
    }

    private _teams: ITeam[] = [];
    private _machines: IMachine[] = [];

    get teams() {
        return this._teams;
    }

    get machines() {
        return this._machines;
    }
}
