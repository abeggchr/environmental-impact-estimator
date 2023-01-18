import {Impact} from "../Impact";
import {ITeam} from "./ITeam";
import {CommuteCalculator} from "./CommuteCalculator";
import {WorkCalculator} from "./WorkCalculator";

export class TeamCalculator {

    constructor(private commuteCalculator = new CommuteCalculator(), private workCalculator = new WorkCalculator()) {
    }

    public calculate(team: ITeam): Impact {

        // videoconference
        // duration per working day * emission per duration * total number of working days * teamsize

        // flights
        // flight emission per visit and person * visit numbererval per working day * teamsize * total number of working days

        const impact = new Impact();
        impact.add("commute", this.commuteCalculator.calculate(team));
        impact.add("work", this.workCalculator.calculate(team));
        return impact;
    }
}