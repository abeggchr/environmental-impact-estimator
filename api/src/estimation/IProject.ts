import {ITeam} from "./team/ITeam";
import {IMachine} from "./machine/IMachine";

export interface IProject {
    teams: ITeam[];
    machines: IMachine[];
}