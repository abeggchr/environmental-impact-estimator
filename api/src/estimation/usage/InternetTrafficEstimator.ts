import {IUsage} from "./IUsage";
import {Impact} from "../Impact";
import {BUSINESS_DAYS_PER_YEAR} from "../common/Constants";

export class InternetTrafficEstimator {

    public estimate(usage: IUsage) {
        const gigabytesPerBusinessDayAndUser = usage.initialRequest_gb + (usage.additionalRequest_gb * usage.requestsPerBusinessDayAndUser_nr);
        const gigabytes = gigabytesPerBusinessDayAndUser * usage.users_nr * BUSINESS_DAYS_PER_YEAR * usage.duration_years;
        const gCO2eq = gigabytes * usage.trafficCoefficient_kWhPerGb * usage.trafficEmissionFactor_gC02eqPerKWh;
        return new Impact(gCO2eq, `(${usage.initialRequest_gb} gb + (${usage.additionalRequest_gb} gb/request * ${usage.requestsPerBusinessDayAndUser_nr} requests/businessDayAndUser)) * ${usage.users_nr} [users] * ${usage.duration_years * BUSINESS_DAYS_PER_YEAR} d [businessDays]) * ${usage.trafficCoefficient_kWhPerGb} kWh/gb [coefficient] * ${usage.trafficEmissionFactor_gC02eqPerKWh} gC02eq/kWh [emissionFactor]`);
    }
}