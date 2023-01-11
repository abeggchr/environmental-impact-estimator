import {ITeam} from "./team/ITeam";
import {DevelopmentTeam} from "./team/DevelopmentTeam";
import {MaintenanceTeam} from "./team/MaintenanceTeam";
import {IProject} from "./IProject";

export class Project implements IProject {

    constructor() {
        this._teams.push(new DevelopmentTeam());
        this._teams.push(new MaintenanceTeam());
    }

    private _teams: ITeam[] = [];

    get teams() {
        return this._teams;
    }
}
