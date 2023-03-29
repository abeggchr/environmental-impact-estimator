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

    workingHours_perDay: number;

    workLocation_percentage: {
        office: number,
        home: number
    }

    teamDistribution_nr: LocationTypes;

    emissionFactor_gC02eqPerKWh: LocationTypes;

    weeksBetweenTravels_nr: number,

    travelDistributionFrom_percentage: LocationTypes;

    travelEmission_gC02eqPerOnewayTravel: number;

    workplaceEmbodiedEmissions_gCO2eq : number;

    workplacePowerUsage_W: number;

    workplaceExpectedLifespan_years: number;

    /**
     * a "videoconference day" is a day when either the team works distributed
     * or the team works in home office
     */
    videoconference_hoursPerVideoconferenceDayAndTeamMember: number;

    videoconference_gC02eqPerHour: number;
}