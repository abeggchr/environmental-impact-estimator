import {DevelopmentTeam} from "./DevelopmentTeam";

export class MaintenanceTeam extends DevelopmentTeam {

    get teamName() {
        return "maintenance";
    }

    get duration_years() {
        return 6;
    }

    get teamSize_nr() {
        return 2;
    }

    get distribution_percentage() {
        return {mainLocation: 1, remoteLocation: 0};
    }
}