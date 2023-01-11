import {ITeam, TrafficTypes} from "./ITeam";
import {Impact} from "../Impact";

export class CommuteCalculator {

    public static calculate(team: ITeam): Impact {
        const impact = new Impact();
        impact.add(this.calculateCommute(team, "individualTrafficCombustion"));
        impact.add(this.calculateCommute(team, "individualTrafficElectric"));
        impact.add(this.calculateCommute(team, "individualTrafficSlow"));
        impact.add(this.calculateCommute(team, "publicTraffic"));
        return impact;
    }

    private static totalWorkingDays(team: ITeam) {
        return team.workingDays_perYear * team.duration_years * team.size;
    }

    private static calculateCommute(team: ITeam, modal: keyof TrafficTypes): [keyof TrafficTypes, Impact] {
        const gC02eq = this.totalWorkingDays(team) * team.commuteDistance_Km * team.workLocation_Percentage.office * team.commuteEmission_gC02eqPerKm[modal] * team.commuteModalSplit_Percentage[modal];
        return [modal, new Impact(0, gC02eq)];
    }
}
