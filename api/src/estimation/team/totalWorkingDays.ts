import {ITeam} from "../../interfaces/ITeam";
import {testTeam} from "../../interfaces/testTeam";
import {BUSINESS_DAYS_PER_YEAR} from "../common/Constants";

export function totalWorkingDays(team: ITeam) {
    return BUSINESS_DAYS_PER_YEAR * team.duration_years * (testTeam.teamDistribution_nr.mainLocation + testTeam.teamDistribution_nr.remoteLocation);
}