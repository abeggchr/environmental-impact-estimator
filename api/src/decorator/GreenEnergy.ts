import {ProjectDecorator} from "./ProjectDecorator";
import {ITeam} from "../interfaces/ITeam";
import {IMachine} from "../interfaces/IMachine";
import {IUsage} from "../interfaces/IUsage"


// Azure emission factor is unclear/unrealistic:
// - 5.67 g/kWh according to https://www.cloudcarbonfootprint.org/docs/methodology#appendix-i-energy-coefficients
// - 11.52 g/kWh according to https://www.carbonfootprint.com/docs/2022_03_emissions_factors_sources_for_2021_electricity_v11.pdf (country specific electricity factor)
// - but ewz.pronatur 20221 emission factor 19 gCO2eq/kWh - and that is already considered low
// AWS and GCP are a bit more realistic:
// - AWS Germany: 311 g/kWh according to https://www.cloudcarbonfootprint.org/docs/methodology#appendix-i-energy-coefficients
// - GCP europe-west6 (CH): 86 g/kWh according to https://cloud.google.com/sustainability/region-carbon
export const CLOUD_EMISSION_FACTOR = 86;

// ewz.pronatur 20221 emission factor 19 gCO2eq/kWh
const GREEN_GRID_EMISSION_FACTOR = 19;

// Source: https://www.mobitool.ch/de/tools/mobitool-faktoren-v2-1-25.html?tag=3
const GREEN_VIDEOCONFERENCE_EMISSION_FACTOR = 40;

/**
 * Use "green energy" in workplaces, for video conference and in data centre.
 */
export class GreenEnergy extends ProjectDecorator {

    protected override decorateTeam(team: ITeam): ITeam {
        return Object.assign(team, {

            emissionFactor_gC02eqPerKWh: {
                mainLocation:   Math.min(GREEN_GRID_EMISSION_FACTOR, team.emissionFactor_gC02eqPerKWh.mainLocation),
                remoteLocation: Math.min(GREEN_GRID_EMISSION_FACTOR, team.emissionFactor_gC02eqPerKWh.remoteLocation),
            },

            videoconference_gC02eqPerHour: 40
        });
    }

    protected override decorateMachine(machine: IMachine): IMachine {
        return Object.assign(machine, {
            emissionFactor_gC02eqPerkWh: Math.min(CLOUD_EMISSION_FACTOR, machine.emissionFactor_gC02eqPerkWh)
        });
    }

    protected override decorateUsage(usage: IUsage): IUsage {
        return Object.assign(usage, {
            workplaceEmissionFactor_gC02eqPerKWh: Math.min(GREEN_VIDEOCONFERENCE_EMISSION_FACTOR, usage.workplaceEmissionFactor_gC02eqPerKWh)
        });
    }
}