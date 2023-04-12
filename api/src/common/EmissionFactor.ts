/**
 * Emission factors in g/kWh
 */
export class EmissionFactor {
    /**
     * Source: https://app.electricitymaps.com (consumption) aggregated for 2022: CH 153, Bulgaria 536
     * Source: https://app.electricitymaps.com (production) aggregated for 2022: CH 60, Bulgaria 536
     * Source: https://www.gov.uk/government/publications/greenhouse-gas-reporting-conversion-factors-2022, UK Electricity for 2022: 193.8 gC02eq
     */
    static SWITZERLAND_CONSUMPTION = 153;
    static SWITZERLAND_PRODUCTION = 60;
    static BULGARIA = 536; // consumption and production are equal

    static EUROPE = 200; // Source: https://app.electricitymaps.com/map for 2022, roughly averaged over multiple European countries

    // Azure emission factor is unclear/unrealistic:
    // - 5.67 g/kWh according to https://www.cloudcarbonfootprint.org/docs/methodology#appendix-i-energy-coefficients
    // - 11.52 g/kWh according to https://www.carbonfootprint.com/docs/2022_03_emissions_factors_sources_for_2021_electricity_v11.pdf (country specific electricity factor)
    // - but ewz.pronatur 20221 emission factor 19 gCO2eq/kWh - and that is already considered low
    // AWS and GCP are a bit more realistic:
    // - AWS Germany: 311 g/kWh according to https://www.cloudcarbonfootprint.org/docs/methodology#appendix-i-energy-coefficients
    // - GCP europe-west6 (CH): 86 g/kWh according to https://cloud.google.com/sustainability/region-carbon
    static CLOUD_EMISSION_FACTOR = 86;

    // ewz.pronatur 2021
    static GREEN_ENERGY_PRODUCTION = 19;

    static GREEN_VIDEOCONFERENCE_EMISSION_FACTOR = 40; // Source: https://www.mobitool.ch/de/tools/mobitool-faktoren-v2-1-25.html?tag=3
    static VIDEOCONFERENCE_EMISSION_FACTOR = 45; // Source: https://www.mobitool.ch/de/tools/mobitool-faktoren-v2-1-25.html?tag=3

    static CARBON_AWARE = 10;
}