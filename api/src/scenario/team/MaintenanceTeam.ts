import {DevelopmentTeam} from "./DevelopmentTeam";

export class MaintenanceTeam extends DevelopmentTeam {

    override teamName = "maintenance";

    override duration_years = 8;

    override teamDistribution_nr = {mainLocation: 2, remoteLocation: 0};
}