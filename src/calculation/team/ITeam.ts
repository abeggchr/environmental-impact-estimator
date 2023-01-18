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

    teamSize_nr: number;

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

    distribution_percentage: LocationTypes;

    energyEmission_gC02eqPerKWh: LocationTypes;

    powerUsageWorkplace_W: number
}