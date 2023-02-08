import {Impact} from "../Impact";
import {IMachine} from "./IMachine";
import {estimateKwh} from "../estimateKWh";

export class PhysicalMachineEstimator {

    public estimate(machine: IMachine): Impact {
        const impact = new Impact();
        impact.add("embodiedEmissions", this.estimateEmbodiedEmissions(machine));
        return impact;
    }

    /**
     * Source: https://github.com/Green-Software-Foundation/software_carbon_intensity/blob/f8ca3cb7b3195e9d3610ec58670a0d47ea7164e5/Software_Carbon_Intensity/Software_Carbon_Intensity_Specification.md?plain=1#L131
     */
    private estimateEmbodiedEmissions(machine: IMachine) {
        const gCO2 = machine.embodiedEmissions_gC02eq * (machine.duration_years / machine.expectedLifespan_years);
        const kWh = estimateKwh(gCO2, machine.emissionFactor_gC02eqPerkWh);
        return new Impact(kWh, gCO2);
    }
}