import {ITeam} from "./team/ITeam";
import {IMachine} from "./machine/IMachine";
import {IUsage} from "./usage/IUsage";

export interface IProject {
    teams: ITeam[];
    machines: IMachine[];

    usage: IUsage;
}