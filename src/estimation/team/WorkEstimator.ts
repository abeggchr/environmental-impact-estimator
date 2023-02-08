import {ITeam, LocationTypes} from "./ITeam";
import {Impact} from "../Impact";
import {totalWorkingDays} from "./totalWorkingDays";

export class WorkEstimator {

    public estimate(team: ITeam): Impact {
        const impact = new Impact();
        impact.add(...this.estimateWork(team, "mainLocation"));
        impact.add(...this.estimateWork(team, "remoteLocation"));
        return impact;
    }

    private estimateWork(team: ITeam, location: keyof LocationTypes): [keyof LocationTypes, Impact] {
        const kWh = totalWorkingDays(team) * team.workingHours_perDay * team.powerUsageWorkplace_W * team.teamDistribution_nr[location] / 1000;
        return [location, new Impact(kWh * team.emissionFactor_gC02eqPerKWh[location])];
    }
}
