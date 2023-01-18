import {DevelopmentTeam} from "./DevelopmentTeam";

export class MaintenanceTeam extends DevelopmentTeam {

    override teamName = "maintenance";

    override duration_years = 6;

    override teamSize_nr = 2;

    override distribution_percentage = {mainLocation: 1, remoteLocation: 0};
}