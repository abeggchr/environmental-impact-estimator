import {ITeam} from "./ITeam";

export function totalWorkingDays(team: ITeam) {
    return team.workingDays_perYear * team.duration_years * team.teamSize_nr;
}