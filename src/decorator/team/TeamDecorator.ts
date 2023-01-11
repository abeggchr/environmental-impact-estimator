import {ITeam} from "../../scenario/team/ITeam";

export class TeamDecorator implements ITeam {

    constructor(private team: ITeam) {
        this.team = team;
    }

    get teamName() {
        return this.team.teamName;
    }

    get commuteDistance_km() {
        return this.team.commuteDistance_km;
    }

    get commuteEmission_gC02eqPerKm() {
        return this.team.commuteEmission_gC02eqPerKm;
    }

    get commuteModalSplit_percentage() {
        return this.team.commuteModalSplit_percentage;
    };

    get distribution_percentage() {
        return this.team.distribution_percentage;
    }

    get duration_years() {
        return this.team.duration_years;
    }

    get energyEmission_gC02eqPerKWh() {
        return this.team.energyEmission_gC02eqPerKWh;
    }

    get teamSize_nr() {
        return this.team.teamSize_nr;
    }

    get workLocation_percentage() {
        return this.team.workLocation_percentage;
    }

    get workingDays_perYear() {
        return this.team.workingDays_perYear;
    }

    get workingHours_perDay() {
        return this.team.workingHours_perDay;
    }
}