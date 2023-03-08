import {ITeam} from "./ITeam";
import {IMachine} from "./IMachine";
import {IUsage} from "./IUsage";

export interface IProject {
    teams: ITeam[];
    machines: IMachine[];

    usage: IUsage;
}