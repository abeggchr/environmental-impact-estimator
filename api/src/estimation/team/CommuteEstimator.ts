import {ITeam, TrafficTypes} from "./ITeam";
import {Impact} from "../Impact";
import {totalWorkingDays} from "./totalWorkingDays";

export class CommuteEstimator {

    public estimate(team: ITeam): Impact {
        const impact = new Impact();
        impact.add(...this.estimateCommute(team, "individualTrafficCombustion"));
        impact.add(...this.estimateCommute(team, "individualTrafficElectric"));
        impact.add(...this.estimateCommute(team, "individualTrafficSlow"));
        impact.add(...this.estimateCommute(team, "publicTraffic"));
        return impact;
    }

    private estimateCommute(team: ITeam, modal: keyof TrafficTypes): [keyof TrafficTypes, Impact] {
        const gC02eq = totalWorkingDays(team) * team.commuteDistance_km * team.workLocation_percentage.office * team.commuteEmission_gC02eqPerKm[modal] * team.commuteModalSplit_percentage[modal];
        return [modal, new Impact(gC02eq)];
    }
}
