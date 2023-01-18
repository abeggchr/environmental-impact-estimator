import {ITeam} from "../../calculation/team/ITeam";

export class DevelopmentTeam implements ITeam {

    teamName = "development";

    /**
     * Source: https://www.bfs.admin.ch/bfs/en/home/statistics/mobility-transport/passenger-transport/commuting.html
     */
    commuteDistance_km = 13.6;

    /***
     * Sources:
     * [1] https://ourworldindata.org/travel-carbon-footprint
     * [2] https://modmo.io/blogs/news/what-is-the-carbon-footprint-of-an-ebike
     *
     * The source [1] is unclear whether embodied emissions are included.
     * For slow traffic, embodied emissions are included as well as the food required to cycle/walk. Based on [2]
     */
    commuteEmission_gC02eqPerKm = {
        // 43g-283g for cars (52%), 84-135g for motorcycle (12%)
        individualTrafficCombustion: 135,
        // 46g-77g including hybrid with UK electricity
        individualTrafficElectric: 53,
        // e-bike 2%, bicycle 7%, foot 10%
        individualTrafficSlow: 35,
        // rail 15% 41g, road 12% 105g (bus) 35g (tram)
        publicTraffic: 60
    };


    /**
     * Sources:
     * [1] https://www.bfs.admin.ch/bfs/en/home/statistics/mobility-transport/passenger-transport/commuting.html
     * [2] https://www.bfs.admin.ch/bfs/en/home/statistics/mobility-transport/transport-infrastructure-vehicles/vehicles/road-vehicles-stock-level-motorisation.html
     */
    commuteModalSplit_percentage =
        // percentageOfHybridAndElectricVehicles = (70223+43223) / 4688235 = 2.42%;
        {
            // passenger car, motorised two-wheeler
            individualTrafficCombustion: 0.54 * 0.98,
            individualTrafficElectric: 0.54 * 0.02,
            // bicycle, e-bike, foot
            individualTrafficSlow: 0.19,
            // railway, public road transport
            publicTraffic: 0.27
        };


    distribution_percentage = {mainLocation: 0.5, remoteLocation: 0.5};


    duration_years = 1;


    energyEmission_gC02eqPerKWh = {mainLocation: 1, remoteLocation: 1};


    teamSize_nr = 8;


    workLocation_percentage = {office: 0.5, home: 0.5};


    /**
     * Working days in Zurich in 2023
     * according to https://www.arbeitstage.ch/
     */
    workingDays_perYear = 251;

    workingHours_perDay = 8.4;

    /**
     * Measured my own desk.
     * Includes laptop, monitor.
     * Excludes phone, network, lightning, heating, cooling.
     */
    powerUsageWorkplace_W = 125;
}