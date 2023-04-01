import {Impact} from "../Impact";
import {BUSINESS_DAYS_PER_YEAR} from "../common/Constants";
import {IUsage} from "../../interfaces/IUsage";
import {wattHoursToKiloWattHours} from "../../common/testing/unitConversion";

export class WorkEstimator {

    public estimate(usage: IUsage): Impact {
        const gC02eq = wattHoursToKiloWattHours((usage.workplacePowerUsage_W  * BUSINESS_DAYS_PER_YEAR * usage.duration_years * usage.usagePerUserAndBusinessDay_h)) *  usage.users_nr * usage.workplaceEmissionFactor_gC02eqPerKWh;
        const formula = `((${usage.workplacePowerUsage_W}W * ${BUSINESS_DAYS_PER_YEAR}d/y * ${usage.duration_years}y * ${usage.usagePerUserAndBusinessDay_h}h) / 1000 ) *  ${usage.users_nr} [users] * ${usage.workplaceEmissionFactor_gC02eqPerKWh}gC02eq per kWh`;
        return new Impact(gC02eq, formula);
    }
}
