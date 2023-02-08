import {ITeam} from "./ITeam";
import {Impact} from "../Impact";

export class EmbodiedEmissionsEstimator {
    /**
     * Source: https://github.com/Green-Software-Foundation/software_carbon_intensity/blob/f8ca3cb7b3195e9d3610ec58670a0d47ea7164e5/Software_Carbon_Intensity/Software_Carbon_Intensity_Specification.md?plain=1#L131
     */
    public estimate(team: ITeam) {
        const gCO2 = team.workplaceEmbodiedEmissions_gCO2eq * (team.duration_years / team.workplaceExpectedLifespan_years);
        return new Impact(gCO2);
    }
}