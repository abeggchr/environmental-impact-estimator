import {ITeam} from "./ITeam";
import {Impact} from "../Impact";

export class EmbodiedEmissionsEstimator {
    /**
     * Source: https://github.com/Green-Software-Foundation/software_carbon_intensity/blob/f8ca3cb7b3195e9d3610ec58670a0d47ea7164e5/Software_Carbon_Intensity/Software_Carbon_Intensity_Specification.md?plain=1#L131
     */
    public estimate(team: ITeam) {
        const persons = team.teamDistribution_nr.mainLocation + team.teamDistribution_nr.remoteLocation;
        const gCO2 = (persons) * team.workplaceEmbodiedEmissions_gCO2eq * (team.duration_years / team.workplaceExpectedLifespan_years);
        const formula = `${persons} [persons] * ${team.workplaceEmbodiedEmissions_gCO2eq}gC02eq * (${team.duration_years}years [duration] / ${team.workplaceExpectedLifespan_years}years [lifespan])`;
        return new Impact(gCO2, formula);
    }
}