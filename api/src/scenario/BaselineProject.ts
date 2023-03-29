import {ITeam} from "../interfaces/ITeam";
import {DevelopmentTeam} from "./team/DevelopmentTeam";
import {MaintenanceTeam} from "./team/MaintenanceTeam";
import {IProject} from "../interfaces/IProject";
import {IMachine} from "../interfaces/IMachine";
import {WebProductionMachine} from "./machine/production/WebProductionMachine";
import {BaselineUsage} from "./usage/BaselineUsage";
import {IUsage} from "../interfaces/IUsage";
import {DbProductionMachine} from "./machine/production/DbProductionMachine";
import {JobProductionMachine} from "./machine/production/JobProductionMachine";
import {TestEnvironment} from "./machine/environment/TestEnvironment";
import {ContinuousIntegrationEnvironment} from "./machine/environment/ContinuousIntegrationEnvironment";
import {WebStagingMachine} from "./machine/staging/WebStagingMachine";
import {DbStagingMachine} from "./machine/staging/DbStagingMachine";
import {JobStagingMachine} from "./machine/staging/JobStagingMachine";

export class BaselineProject implements IProject {

    constructor() {
        this._teams.push(new DevelopmentTeam());
        this._teams.push(new MaintenanceTeam());
        this._machines.push(new WebProductionMachine());
        this._machines.push(new DbProductionMachine());
        this._machines.push(new JobProductionMachine());
        this._machines.push(new WebStagingMachine());
        this._machines.push(new DbStagingMachine());
        this._machines.push(new JobStagingMachine());
        this._machines.push(new TestEnvironment());
        this._machines.push(new ContinuousIntegrationEnvironment());
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
