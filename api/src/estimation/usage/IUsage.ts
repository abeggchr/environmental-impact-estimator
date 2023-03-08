export interface IUsage {

    users_nr: number;

    trafficEmissionFactor_gC02eqPerKWh: number;

    trafficCoefficient_kWhPerGb: number;


    duration_years: number;

    usagePerUserAndBusinessDay_h: number;

    initialRequest_gb: number;

    additionalRequest_gb: number;

    requestsPerBusinessDayAndUser_nr: number;

    workplaceExpectedLifespan_years: number;

    workplaceEmbodiedEmissions_gC02eq: number;

    workplaceEmissionFactor_gC02eqPerKWh: number;


}