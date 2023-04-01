import {ITeam, LocationTypes} from "../../interfaces/ITeam";
import {Impact} from "../Impact";
import {BUSINESS_DAYS_PER_YEAR} from "../common/Constants";
import {wattHoursToKiloWattHours} from "../../common/testing/unitConversion";

export class WorkEstimator {

    public estimate(team: ITeam): Impact {
        const impact = new Impact();
        impact.add(...this.estimateWork(team, "mainLocation"));
        impact.add(...this.estimateWork(team, "remoteLocation"));
        return impact;
    }

    private estimateWork(team: ITeam, location: keyof LocationTypes): [keyof LocationTypes, Impact] {
        const gC02eq = wattHoursToKiloWattHours((team.workplacePowerUsage_W  * BUSINESS_DAYS_PER_YEAR * team.duration_years * team.workingHours_perDay)) *  team.teamDistribution_nr[location] * team.emissionFactor_gC02eqPerKWh[location];
        const formula = `((${team.workplacePowerUsage_W}W * ${BUSINESS_DAYS_PER_YEAR}d/y * ${team.duration_years}y * ${team.workingHours_perDay}h) / 1000 ) *  ${team.teamDistribution_nr[location]} [persons] * ${team.emissionFactor_gC02eqPerKWh[location]}gC02eq per kWh`;
        return [location, new Impact(gC02eq, formula)];
    }
}
