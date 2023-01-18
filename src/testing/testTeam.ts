import {ITeam} from "../calculation/team/ITeam";

export const testTeam: ITeam = {
    teamName: "test",
    commuteDistance_km: 1,
    commuteEmission_gC02eqPerKm: {
        individualTrafficCombustion: 0.1,
        individualTrafficElectric: 0.2,
        individualTrafficSlow: 0.3,
        publicTraffic: 0.4
    },
    commuteModalSplit_percentage: {
        individualTrafficCombustion: 0.01,
        individualTrafficElectric: 0.02,
        individualTrafficSlow: 0.03,
        publicTraffic: 0.94
    },
    distribution_percentage: {mainLocation: 0.5, remoteLocation: 0.5},
    duration_years: 2,
    energyEmission_gC02eqPerKWh: {mainLocation: 3, remoteLocation: 4},
    teamSize_nr: 5,
    workLocation_percentage: {home: 0.55, office: 0.45},
    workingDays_perYear: 6,
    workingHours_perDay: 7,
    powerUsageWorkplace_W: 8
};