import {IUsage} from "../../estimation/usage/IUsage";
import {DevelopmentTeam} from "../team/DevelopmentTeam";
import {MaintenanceTeam} from "../team/MaintenanceTeam";

export class BaselineUsage implements IUsage {

    private developmentTeam = new DevelopmentTeam();
    private maintenanceTeam = new MaintenanceTeam();

    additionalRequest_gb = 0.0001; // 100kb
    duration_years = this.maintenanceTeam.duration_years;
    workplaceEmbodiedEmissions_gC02eq = this.developmentTeam.workplaceEmbodiedEmissions_gCO2eq;
    workplaceExpectedLifespan_years = this.developmentTeam.workplaceExpectedLifespan_years;
    initialRequest_gb = 0.0035; // 3.5mb
    trafficCoefficient_kWhPerGb = 0.06;  // Source: https://www.cloudcarbonfootprint.org/docs/methodology/#appendix-iv-recent-networking-studies
    trafficEmissionFactor_gC02eqPerKWh = 250; // Source: https://app.electricitymaps.com/map for 2022, averaged over multiple European countries
    usagePerUserAndBusinessDay_h = 1; // application is used 1 hour
    requestsPerBusinessDayAndUser_nr = 3 * 60 * 1; // 3 request per minute and user during 1h of usage
    users_nr = 9000;
    workplaceEmissionFactor_gC02eqPerKWh = this.trafficEmissionFactor_gC02eqPerKWh;
    workplacePowerUsage_W = this.developmentTeam.workplacePowerUsage_W;
}
