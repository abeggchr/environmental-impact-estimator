import {ITeam} from "../calculation/team/ITeam";
import {DevelopmentTeam} from "./team/DevelopmentTeam";
import {MaintenanceTeam} from "./team/MaintenanceTeam";
import {IProject} from "../calculation/IProject";

export class BaselineProject implements IProject {

    constructor() {
        this._teams.push(new DevelopmentTeam());
        this._teams.push(new MaintenanceTeam());
    }

    private _teams: ITeam[] = [];

    get teams() {
        return this._teams;
    }
}
