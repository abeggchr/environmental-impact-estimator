export interface TrafficTypes {
    individualTrafficCombustion: number,
    individualTrafficElectric: number,
    individualTrafficSlow: number,
    publicTraffic: number
}

export interface LocationTypes {
    mainLocation: number,
    remoteLocation: number,
}

export interface ITeam {

    teamName: string;

    duration_years: number;

    commuteModalSplit_percentage: TrafficTypes;

    commuteEmission_gC02eqPerKm: TrafficTypes;

    commuteDistance_km: number,

    workingDays_perYear: number;
    workingHours_perDay: number;

    workLocation_percentage: {
        office: number,
        home: number
    }

    teamDistribution_nr: LocationTypes;

    emissionFactor_gC02eqPerKWh: LocationTypes;

    powerUsageWorkplace_W: number,

    weeksBetweenTravels_nr: number,

    travelDistributionFrom_percentage: LocationTypes;

    travelEmission_gC02eqPerOnewayTravel: number
}