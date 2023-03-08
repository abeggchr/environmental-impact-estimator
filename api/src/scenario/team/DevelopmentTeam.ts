import {ITeam} from "../../estimation/team/ITeam";

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

    teamDistribution_nr = {mainLocation: 4, remoteLocation: 4};

    duration_years = 2;

    /**
     * Source: https://app.electricitymaps.com aggregated for 2022: CH 153, Bulgaria 536
     * Source: https://www.gov.uk/government/publications/greenhouse-gas-reporting-conversion-factors-2022, UK Electricity for 2022: 193.8 gC02eq
     */
    static Switzerland_EmissionFactor_gC02eqPerKWh = 153;
    emissionFactor_gC02eqPerKWh = {mainLocation: DevelopmentTeam.Switzerland_EmissionFactor_gC02eqPerKWh, remoteLocation: 536};

    workLocation_percentage = {office: 0.5, home: 0.5};


    workingDays_perYear = 251;

    workingHours_perDay = 8.4;

    /**
     * Measured my own desk.
     * Includes laptop, monitor.
     * Excludes phone, network, lightning, heating, cooling.
     */
    workplacePowerUsage_W = 125;

    travelDistributionFrom_percentage = {mainLocation: 0.4, remoteLocation: 0.6};

    /**
     * ZRH - SOF, Economy
     * Source: www.myclimate.ch
     */
    travelEmission_gC02eqPerOnewayTravel = 210000;

    weeksBetweenTravels_nr = 6;

    /**
     * Laptop: 322kg, Dell XPS 15 9500, https://www.delltechnologies.com/asset/en-us/products/laptops-and-2-in-1s/technical-support/xps-15-9500-pcf-datasheet.pdf
     * Screen: 397 kg, Dell E2720HS, https://www.delltechnologies.com/asset/en-us/products/electronics-and-accessories/technical-support/e2720hs-monitor-pcf-datasheet.pdf
     * Keyboard: 22kg, Logitech G213, https://www.logitech.com/de-ch/sustainability/carbon-transparency.html#questions
     * Mouse: 8kg, Logitech G502, https://www.logitech.com/de-ch/sustainability/carbon-transparency.html#questions
     */
    workplaceEmbodiedEmissions_gCO2eq = (322 + 397 + 22 + 8) * 1000;

    /**
     * 4 years for laptop, 6 years for screen, mouse and keyboard -> averages to roughly 5 years.
     */
    workplaceExpectedLifespan_years = 5;
}