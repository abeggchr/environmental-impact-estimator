import {ITeam, TrafficTypes} from "../../scenario/team/ITeam";
import {Impact} from "../Impact";

export class CommuteCalculator {

    public calculate(team: ITeam): Impact {
        const impact = new Impact();
        impact.add(...this.calculateCommute(team, "individualTrafficCombustion"));
        impact.add(...this.calculateCommute(team, "individualTrafficElectric"));
        impact.add(...this.calculateCommute(team, "individualTrafficSlow"));
        impact.add(...this.calculateCommute(team, "publicTraffic"));
        return impact;
    }

    private totalWorkingDays(team: ITeam) {
        return team.workingDays_perYear * team.duration_years * team.teamSize_nr;
    }

    private calculateCommute(team: ITeam, modal: keyof TrafficTypes): [keyof TrafficTypes, Impact] {
        const gC02eq = this.totalWorkingDays(team) * team.commuteDistance_km * team.workLocation_percentage.office * team.commuteEmission_gC02eqPerKm[modal] * team.commuteModalSplit_percentage[modal];
        return [modal, new Impact(0, gC02eq)];
    }
}
