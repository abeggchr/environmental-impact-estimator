import {ITeam} from "./ITeam";
import {testTeam} from "../../testing/testTeam";

export function totalWorkingDays(team: ITeam) {
    return team.workingDays_perYear * team.duration_years * (testTeam.teamDistribution_nr.mainLocation + testTeam.teamDistribution_nr.remoteLocation);
}