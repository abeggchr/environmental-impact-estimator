import {Impact} from "../Impact";
import {ITeam} from "./ITeam";
import {CommuteEstimator} from "./CommuteEstimator";
import {WorkEstimator} from "./WorkEstimator";
import {TravelEstimator} from "./TravelEstimator";

export class TeamEstimator {

    constructor(
        private commuteEstimator = new CommuteEstimator(),
        private workEstimator = new WorkEstimator(),
        private travelEstimator = new TravelEstimator()) {
    }

    public estimate(team: ITeam): Impact {

        // Not included:
        // * videoconference
        // * manufacturing of hardware used

        const impact = new Impact();
        impact.add("commute", this.commuteEstimator.estimate(team));
        impact.add("work", this.workEstimator.estimate(team));
        impact.add("travel", this.travelEstimator.estimate(team));
        return impact;
    }
}