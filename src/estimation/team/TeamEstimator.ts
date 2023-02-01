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

    public calculate(team: ITeam): Impact {

        // Not included:
        // * videoconference
        // * manufacturing of hardware used

        const impact = new Impact();
        impact.add("commute", this.commuteEstimator.calculate(team));
        impact.add("work", this.workEstimator.calculate(team));
        impact.add("travel", this.travelEstimator.calculate(team));
        return impact;
    }
}