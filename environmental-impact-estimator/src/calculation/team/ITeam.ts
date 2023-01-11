export interface TrafficTypes {
    individualTrafficCombustion: number,
    individualTrafficElectric: number,
    individualTrafficSlow: number,
    publicTraffic: number
}

export interface ITeam {

    size: number;

    duration_years: number;

    commuteModalSplit_Percentage: TrafficTypes;

    commuteEmission_gC02eqPerKm: TrafficTypes;

    commuteDistance_Km: number,

    workingDays_perYear: number;
    workingHours_perDay: number;

    workLocation_Percentage: {
        office: number,
        home: number
    }

    distribution_percentage: {
        mainLocation: number,
        remoteLocation: number,
    }

    energyEmission_gC02eqPerKWh: {
        mainLocation: number,
        remoteLocation: number,
    }
}