import {Impact} from "../Impact";
import {ITeam} from "./ITeam";
import {CommuteCalculator} from "./CommuteCalculator";
import {WorkCalculator} from "./WorkCalculator";
import {TravelCalculator} from "./TravelCalculator";

export class TeamCalculator {

    constructor(private commuteCalculator = new CommuteCalculator(), private workCalculator = new WorkCalculator(), private travelCalculator = new TravelCalculator()) {
    }

    public calculate(team: ITeam): Impact {

        // Not included:
        // * videoconference
        // * manufacturing of hardware used

        const impact = new Impact();
        impact.add("commute", this.commuteCalculator.calculate(team));
        impact.add("work", this.workCalculator.calculate(team));
        impact.add("travel", this.travelCalculator.calculate(team));
        return impact;
    }
}