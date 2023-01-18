import {ITeam} from "./ITeam";
import {Impact} from "../Impact";

export class TravelCalculator {

    public static readonly WORKING_DAYS_PER_WEEK = 5;

    public calculate(team: ITeam): Impact {
        const numberOfTravels = ((team.duration_years * team.workingDays_perYear) / TravelCalculator.WORKING_DAYS_PER_WEEK) / team.weeksBetweenTravels_nr;
        const numberOfGroupTravelsFromMainToRemoteLocation = numberOfTravels * team.travelDistributionFrom_percentage.mainLocation;
        const numberOfOnewayTravelsFromMainToRemoteLocation = numberOfGroupTravelsFromMainToRemoteLocation * team.teamDistribution_nr.mainLocation * 2;
        const numberOfGroupTravelsFromRemoteToMainLocation = numberOfTravels * team.travelDistributionFrom_percentage.remoteLocation;
        const numberOfOnewayTravelsFromRemoteToMainLocation = numberOfGroupTravelsFromRemoteToMainLocation * team.teamDistribution_nr.remoteLocation * 2;
        const totalOnewayTravels = numberOfOnewayTravelsFromMainToRemoteLocation + numberOfOnewayTravelsFromRemoteToMainLocation;
        const emissions = totalOnewayTravels * team.travelEmission_gC02eqPerOnewayTravel;

        return new Impact(0, emissions);
    }
}
