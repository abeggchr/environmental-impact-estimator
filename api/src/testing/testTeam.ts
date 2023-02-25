import {ITeam} from "../estimation/team/ITeam";

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
    teamDistribution_nr: {mainLocation: 3, remoteLocation: 2},
    duration_years: 2,
    emissionFactor_gC02eqPerKWh: {mainLocation: 3, remoteLocation: 4},
    workLocation_percentage: {home: 0.55, office: 0.45},
    workingDays_perYear: 6,
    workingHours_perDay: 7,
    workplacePowerUsage_W: 8,
    weeksBetweenTravels_nr: 9,
    travelDistributionFrom_percentage: {mainLocation: 0.3, remoteLocation: 0.6},
    travelEmission_gC02eqPerOnewayTravel: 10,
    workplaceEmbodiedEmissions_gCO2eq: 11,
    workplaceExpectedLifespan_years: 12,
};