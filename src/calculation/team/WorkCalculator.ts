import {ITeam, LocationTypes} from "./ITeam";
import {Impact} from "../Impact";
import {totalWorkingDays} from "./totalWorkingDays";

export class WorkCalculator {

    public calculate(team: ITeam): Impact {
        const impact = new Impact();
        impact.add(...this.calculateWork(team, "mainLocation"));
        impact.add(...this.calculateWork(team, "remoteLocation"));
        return impact;
    }

    private calculateWork(team: ITeam, location: keyof LocationTypes): [keyof LocationTypes, Impact] {
        const kWh = totalWorkingDays(team) * team.workingHours_perDay * team.powerUsageWorkplace_W * team.distribution_percentage[location] / 1000;
        return [location, new Impact(kWh, kWh * team.energyEmission_gC02eqPerKWh[location])];
    }
}
