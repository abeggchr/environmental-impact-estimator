import {Impact} from "../Impact";

export class EmbodiedEmissionsEstimator {
    /**
     * Source: https://github.com/Green-Software-Foundation/software_carbon_intensity/blob/f8ca3cb7b3195e9d3610ec58670a0d47ea7164e5/Software_Carbon_Intensity/Software_Carbon_Intensity_Specification.md?plain=1#L131
     */
    public estimate(replicationFactor_nr: number, embodiedEmissions_cCO2eq: number, duration_years: number, expectedLifespan_years: number) {
        const gCO2 = (replicationFactor_nr) * embodiedEmissions_cCO2eq * (duration_years / expectedLifespan_years);
        const formula = `${embodiedEmissions_cCO2eq}gC02eq * (${duration_years}years [duration] / ${expectedLifespan_years}years [lifespan]) * ${replicationFactor_nr} [users]`;
        return new Impact(gCO2, formula);
    }
}