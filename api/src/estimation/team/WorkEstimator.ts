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
        const days = totalWorkingDays(team)
        const gC02eq = ((team.workplacePowerUsage_W * days * team.workingHours_perDay) / 1000) *  team.teamDistribution_nr[location] * team.emissionFactor_gC02eqPerKWh[location] / 1000;
        const formula = `((${team.workplacePowerUsage_W}W * ${days}d * ${team.workingHours_perDay}h) / 1000 ) * ${team.teamDistribution_nr[location]} [persons] * ${team.emissionFactor_gC02eqPerKWh[location]}gC02eq per kWh`;
        return [location, new Impact(gC02eq, formula)];
    }
}
