import {ITeam} from "../calculation/team/ITeam";

export const testTeam: ITeam = {
    teamName: "test",
    commuteDistance_km: 1,
    commuteEmission_gC02eqPerKm: {
        individualTrafficCombustion: 1,
        individualTrafficElectric: 1,
        individualTrafficSlow: 1,
        publicTraffic: 1
    },
    commuteModalSplit_percentage: {
        individualTrafficCombustion: 0.25,
        individualTrafficElectric: 0.25,
        individualTrafficSlow: 0.25,
        publicTraffic: 0.25
    },
    distribution_percentage: {mainLocation: 0.5, remoteLocation: 0.5},
    duration_years: 1,
    energyEmission_gC02eqPerKWh: {mainLocation: 1, remoteLocation: 1},
    teamSize_nr: 1,
    workLocation_percentage: {home: 0.5, office: 0.5},
    workingDays_perYear: 1,
    workingHours_perDay: 1
};