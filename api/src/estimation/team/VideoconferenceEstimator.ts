import {ITeam} from "../../interfaces/ITeam";
import {Impact} from "../Impact";
import {totalWorkingDays} from "./totalWorkingDays";

export class VideoconferenceEstimator {

    public estimate(team: ITeam): Impact {
        const remotePercentage = team.teamDistribution_nr.remoteLocation > 0 ? 1 : 0;
        const homeOfficePercentage = team.workLocation_percentage.home;
        const videoconferencePercentage = Math.max(remotePercentage, homeOfficePercentage);
        const workingDays = totalWorkingDays(team);
        const teamMembers = team.teamDistribution_nr.remoteLocation + team.teamDistribution_nr.mainLocation;
        const videoconferenceHours = workingDays * videoconferencePercentage * team.videoconference_hoursPerVideoconferenceDayAndTeamMember * teamMembers;
        const gCO2eq = videoconferenceHours * team.videoconference_gC02eqPerHour;
        return new Impact(gCO2eq, `${workingDays}d * ${videoconferencePercentage*100}% [percentage of days with video conf] * ${teamMembers} [team members] * ${team.videoconference_hoursPerVideoconferenceDayAndTeamMember}h * ${team.videoconference_gC02eqPerHour}gCO2eq/h`);
    }
}