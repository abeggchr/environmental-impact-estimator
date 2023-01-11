import {ITeam} from "./ITeam";

export class DevelopmentTeam implements ITeam {

    get teamName() {
        return "development";
    }

    /**
     * Source: https://www.bfs.admin.ch/bfs/en/home/statistics/mobility-transport/passenger-transport/commuting.html
     */
    get commuteDistance_km() {
        return 13.6;
    }

    /***
     * Sources:
     * [1] https://ourworldindata.org/travel-carbon-footprint
     * [2] https://modmo.io/blogs/news/what-is-the-carbon-footprint-of-an-ebike
     *
     * The source [1] is unclear whether embodied emissions are included.
     * For slow traffic, embodied emissions are included as well as the food required to cycle/walk. Based on [2]
     */
    get commuteEmission_gC02eqPerKm() {
        return {
            // 43g-283g for cars (52%), 84-135g for motorcycle (12%)
            individualTrafficCombustion: 135,
            // 46g-77g including hybrid with UK electricity
            individualTrafficElectric: 53,
            // e-bike 2%, bicycle 7%, foot 10%
            individualTrafficSlow: 35,
            // rail 15% 41g, road 12% 105g (bus) 35g (tram)
            publicTraffic: 60
        };
    }

    /**
     * Sources:
     * [1] https://www.bfs.admin.ch/bfs/en/home/statistics/mobility-transport/passenger-transport/commuting.html
     * [2] https://www.bfs.admin.ch/bfs/en/home/statistics/mobility-transport/transport-infrastructure-vehicles/vehicles/road-vehicles-stock-level-motorisation.html
     */
    get commuteModalSplit_percentage() {
        // percentageOfHybridAndElectricVehicles = (70223+43223) / 4688235 = 2.42%;
        return {
            // passenger car, motorised two-wheeler
            individualTrafficCombustion: 0.54 * 0.98,
            individualTrafficElectric: 0.54 * 0.02,
            // bicycle, e-bike, foot
            individualTrafficSlow: 0.19,
            // railway, public road transport
            publicTraffic: 0.27
        };
    };

    get distribution_percentage() {
        return {mainLocation: 0.5, remoteLocation: 0.5};
    }

    get duration_years() {
        return 1;
    }

    get energyEmission_gC02eqPerKWh() {
        return {mainLocation: 1, remoteLocation: 1};
    }

    get teamSize_nr() {
        return 8;
    }

    get workLocation_percentage() {
        return {office: 0.5, home: 0.5};
    }

    /**
     * Working days in Zurich in 2023
     * according to https://www.arbeitstage.ch/
     */
    get workingDays_perYear() {
        return 251;
    }

    get workingHours_perDay() {
        return 8.4;
    }
}