/**
 * Taken from cloud carbon footprint > FootprintEstimate.ts.
 * The cloud carbon footprint tool estimates as follows:
 * - estimate the kWh and then calculates the C02eq
 * - estimate the C02eq and then estimate kWh
 */
export function estimateKwh(
    estimatedCo2e: number,
    emissionFactor_gCO2eqPerKWh: number,
): number {
    return estimatedCo2e / emissionFactor_gCO2eqPerKWh;
}