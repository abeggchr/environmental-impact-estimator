import {Impact} from "../Impact";
import {ITeam} from "./ITeam";
import {CommuteCalculator} from "./CommuteCalculator";

export class TeamCalculator {

    constructor(private commuteCalculator = new CommuteCalculator()) {
    }

    public calculate(team: ITeam): Impact {

        // work
        // const officeWork_kWh = totalWorkingDays * team.workLocation_Percentage.office * team.workingHours_perDay * team.distribution_percentage.mainLocation * team.energyEmission_gC02eqPerKWh.mainLocation;
        // office work: working hours per day * energy consumption per working hour * percentage at home * total number of working days
        // home office work: working hours per day * energy consumption per working hour * percentage remote * total number of working days

        // videoconference
        // duration per working day * emission per duration * total number of working days * teamsize

        // flights
        // flight emission per visit and person * visit numbererval per working day * teamsize * total number of working days

        const impact = new Impact();
        impact.add("commute", this.commuteCalculator.calculate(team));
        return impact;
    }
}