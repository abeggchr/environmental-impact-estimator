import {ProjectDecorator} from "./ProjectDecorator";
import {ITeam} from "../interfaces/ITeam";
import {IMachine} from "../interfaces/IMachine";
import {IUsage} from "../interfaces/IUsage";

/**
 * Use "green energy" in workplaces, for video conference and in data centre.
 */
export class GreenEnergy extends ProjectDecorator {

    protected override decorateTeam(team: ITeam): ITeam {
        return Object.assign(team, {
            // ewz.pronatur 20221 emission factor 19 gCO2eq/kWh
            emissionFactor_gC02eqPerKWh: {
                mainLocation:   Math.min(19, team.emissionFactor_gC02eqPerKWh.mainLocation),
                remoteLocation: Math.min(19, team.emissionFactor_gC02eqPerKWh.remoteLocation),
            },
            // Source: https://www.mobitool.ch/de/tools/mobitool-faktoren-v2-1-25.html?tag=3
            videoconference_gC02eqPerHour: 40
        });
    }

    protected override decorateMachine(machine: IMachine): IMachine {
        return Object.assign(machine, {
            // Azure emission factor is unclear/unrealistic:
            // - 5.67 g/kWh according to https://www.cloudcarbonfootprint.org/docs/methodology#appendix-i-energy-coefficients
            // - 11.52 g/kWh according to https://www.carbonfootprint.com/docs/2022_03_emissions_factors_sources_for_2021_electricity_v11.pdf (country specific electricity factor)
            // - but ewz.pronatur 20221 emission factor 19 gCO2eq/kWh - and that is already considered low
            // AWS and GCP are a bit more realistic:
            // - AWS Germany: 311 g/kWh according to https://www.cloudcarbonfootprint.org/docs/methodology#appendix-i-energy-coefficients
            // - GCP europe-west6 (CH): 86 g/kWh according to https://cloud.google.com/sustainability/region-carbon
            emissionFactor_gC02eqPerkWh: Math.min(86, machine.emissionFactor_gC02eqPerkWh)
        });
    }

    protected override decorateUsage(usage: IUsage): IUsage {
        return Object.assign(usage, {
            // ewz.pronatur 20221 emission factor 19 gCO2eq/kWh
            workplaceEmissionFactor_gC02eqPerKWh: Math.min(19, usage.workplaceEmissionFactor_gC02eqPerKWh)
        });
    }
}