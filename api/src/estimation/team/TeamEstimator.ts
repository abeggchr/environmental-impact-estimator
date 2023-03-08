import {Impact} from "../Impact";
import {ITeam} from "./ITeam";
import {CommuteEstimator} from "./CommuteEstimator";
import {WorkEstimator} from "./WorkEstimator";
import {TravelEstimator} from "./TravelEstimator";
import {EmbodiedEmissionsEstimator} from "../common/EmbodiedEmissionsEstimator";

export class TeamEstimator {

    constructor(
        private commuteEstimator = new CommuteEstimator(),
        private workEstimator = new WorkEstimator(),
        private travelEstimator = new TravelEstimator(),
        private embodiedEmissionsEstimator = new EmbodiedEmissionsEstimator()) {
    }

    public estimate(team: ITeam): Impact {
        const impact = new Impact();
        impact.add("commute", this.commuteEstimator.estimate(team));
        impact.add("work", this.workEstimator.estimate(team));
        impact.add("travel", this.travelEstimator.estimate(team));
        impact.add("embodiedEmissions", this.embodiedEmissionsEstimator.estimate(team.teamDistribution_nr.mainLocation + team.teamDistribution_nr.remoteLocation, team.workplaceEmbodiedEmissions_gCO2eq, team.duration_years, team.workplaceExpectedLifespan_years));
        return impact;
    }
}