import {ITeam} from "./ITeam";
import {Impact} from "../Impact";

export class TravelEstimator {

    public static readonly WORKING_DAYS_PER_WEEK = 5;

    public calculate(team: ITeam): Impact {
        if (team.teamDistribution_nr.remoteLocation == 0 || team.teamDistribution_nr.mainLocation == 0) {
            return new Impact(0, 0);
        }

        const numberOfTravels = ((team.duration_years * team.workingDays_perYear) / TravelEstimator.WORKING_DAYS_PER_WEEK) / team.weeksBetweenTravels_nr;
        const numberOfGroupTravelsFromMainToRemoteLocation = numberOfTravels * team.travelDistributionFrom_percentage.mainLocation;
        const numberOfOnewayTravelsFromMainToRemoteLocation = numberOfGroupTravelsFromMainToRemoteLocation * team.teamDistribution_nr.mainLocation * 2;
        const numberOfGroupTravelsFromRemoteToMainLocation = numberOfTravels * team.travelDistributionFrom_percentage.remoteLocation;
        const numberOfOnewayTravelsFromRemoteToMainLocation = numberOfGroupTravelsFromRemoteToMainLocation * team.teamDistribution_nr.remoteLocation * 2;
        const totalOnewayTravels = numberOfOnewayTravelsFromMainToRemoteLocation + numberOfOnewayTravelsFromRemoteToMainLocation;
        const emissions = totalOnewayTravels * team.travelEmission_gC02eqPerOnewayTravel;

        return new Impact(0, emissions);
    }
}
