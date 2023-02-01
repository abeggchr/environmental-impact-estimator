import {ITeam, TrafficTypes} from "./ITeam";
import {Impact} from "../Impact";
import {totalWorkingDays} from "./totalWorkingDays";

export class CommuteEstimator {

    public calculate(team: ITeam): Impact {
        const impact = new Impact();
        impact.add(...this.calculateCommute(team, "individualTrafficCombustion"));
        impact.add(...this.calculateCommute(team, "individualTrafficElectric"));
        impact.add(...this.calculateCommute(team, "individualTrafficSlow"));
        impact.add(...this.calculateCommute(team, "publicTraffic"));
        return impact;
    }

    private calculateCommute(team: ITeam, modal: keyof TrafficTypes): [keyof TrafficTypes, Impact] {
        const gC02eq = totalWorkingDays(team) * team.commuteDistance_km * team.workLocation_percentage.office * team.commuteEmission_gC02eqPerKm[modal] * team.commuteModalSplit_percentage[modal];
        return [modal, new Impact(0, gC02eq)];
    }
}
