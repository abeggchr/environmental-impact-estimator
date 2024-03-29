import {ITeam} from "../../interfaces/ITeam";
import {EmissionFactor} from "../../common/EmissionFactor";

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
     * [3] https://www.mobitool.ch/de/tools/mobitool-faktoren-v2-1-25.html?tag=3
     *
     * The source [1] is unclear whether embodied emissions are included.
     * For slow traffic, embodied emissions are included as well as the food required to cycle/walk. Based on [2]
     */
    commuteEmission_gC02eqPerKm = {
        // [3] Personenwagen > Durchschnitt
        individualTrafficCombustion: 210,

        // [3] Personenwagen > Elektrizität > Verbrauchermix CH
        // [2] 46g-77g including hybrid with UK electricity
        individualTrafficElectric: 89,

        // modal split: e-bike 2%, bicycle 7%, foot 10%
        // [3] Walking 0, Bicycle 8, E-Bike 13
        // [2] Walking 56, Bicycle 21, E-Bike 6
        individualTrafficSlow: 10,

        // [3] Durchschnitt öV
        publicTraffic: 25
    };

    // Statista Link: https://www.statista.com/statistics/449481/switzerland-modal-split-of-passenger-transport-on-land/

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

    emissionFactor_gC02eqPerKWh = {mainLocation: EmissionFactor.SWITZERLAND_CONSUMPTION, remoteLocation: EmissionFactor.BULGARIA};

    workLocation_percentage = {office: 0.8, home: 0.2};

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

    videoconference_gC02eqPerHour = EmissionFactor.VIDEOCONFERENCE_EMISSION_FACTOR;

    videoconference_hoursPerVideoconferenceDayAndTeamMember = 1;

    /**
     * Source:
     * [1] https://www.wwf.de/themen-projekte/landwirtschaft/ernaehrung-konsum/essen-wir-das-klima-auf => 2.1 - 0.6kg
     * [2] https://bitsabout.me/de/der-co2-fussabdruck-unserer-nahrungsmittel/ => avg. CH 2 gCO2/kcal, vegan 1 gC02/kcal, meat 3 gCO2/kcal
     * [3] https://www.tk.de/techniker/magazin/ernaehrung/uebergewicht-und-diaet/wie-viele-kalorien-pro-tag-2006758?tkcm=ab => 1900/2500 kcal pro Tag
     */
    food_gCO2PerLunch = 1500;
}