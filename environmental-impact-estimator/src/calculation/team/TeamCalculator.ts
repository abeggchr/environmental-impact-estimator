import {Impact} from "../Impact";
import {ITeam} from "./ITeam";

class TeamCalculator {
    private static TEAM = "team";
    private static COMMUTE = "commute";

    public static calculate(team: ITeam): Impact[] {

        const impacts: Impact[] = [];
        const totalWorkingDays = this.totalWorkingDays(team);

        // commute emissions
        const individualTrafficCombustion_gC02eq = totalWorkingDays * team.commuteModalSplit_Percentage.individualTrafficCombustion * team.commuteDistance_Km * team.commuteEmission_gC02eqPerKm.individualTrafficCombustion * team.workLocation_Percentage.office;
        impacts.push(new Impact([TeamCalculator.TEAM, TeamCalculator.COMMUTE, "individual traffic combustion"], 0, individualTrafficCombustion_gC02eq));

        const individualTrafficElectric_gC02eq = totalWorkingDays * team.commuteModalSplit_Percentage.individualTrafficElectric * team.commuteDistance_Km * team.commuteEmission_gC02eqPerKm.individualTrafficElectric * team.workLocation_Percentage.office;
        impacts.push(new Impact([TeamCalculator.TEAM, TeamCalculator.COMMUTE, "individual traffic combustion"], 0, individualTrafficElectric_gC02eq));

        const individualTrafficSlow_gC02eq = totalWorkingDays * team.commuteModalSplit_Percentage.individualTrafficSlow * team.commuteDistance_Km * team.commuteEmission_gC02eqPerKm.individualTrafficSlow * team.workLocation_Percentage.office;
        impacts.push(new Impact([TeamCalculator.TEAM, TeamCalculator.COMMUTE, "individual slow traffic"], 0, individualTrafficSlow_gC02eq));

        const publicTransport_gC02eq = totalWorkingDays * team.commuteModalSplit_Percentage.publicTraffic * team.commuteDistance_Km * team.commuteEmission_gC02eqPerKm.publicTraffic * team.workLocation_Percentage.office;
        impacts.push(new Impact([TeamCalculator.TEAM, TeamCalculator.COMMUTE, "public traffic"], 0, publicTransport_gC02eq));

        // work
        const officeWork_kWh = totalWorkingDays * team.workLocation_Percentage.office * team.workingHours_perDay * team.distribution_percentage.mainLocation * team.energyEmission_gC02eqPerKWh.mainLocation;
        // office work: working hours per day * energy consumption per working hour * percentage at home * total number of working days
        // home office work: working hours per day * energy consumption per working hour * percentage remote * total number of working days

        // videoconference
        // duration per working day * emission per duration * total number of working days * teamsize

        // flights
        // flight emission per visit and person * visit numbererval per working day * teamsize * total number of working days

        return [new Impact(1, 1)];
    }

    public static totalWorkingDays(team: ITeam) {
        return team.workingDays_perYear * team.duration_years * team.size;
    }

}