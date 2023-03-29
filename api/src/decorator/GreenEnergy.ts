import {ProjectDecorator} from "./ProjectDecorator";
import {ITeam} from "../interfaces/ITeam";
import {IMachine} from "../interfaces/IMachine";
import {IUsage} from "../interfaces/IUsage";

/**
 * Use "green energy" in workplaces, for video conference and in data centre.
 */
export class GreenEnergy extends ProjectDecorator {

    // ewz.pronatur 20221 emission factor 19 gCO2eq/kWh
    private static EMISSIONS_FACTOR = 19;

    protected override decorateTeam(team: ITeam): ITeam {
        return Object.assign(team, {
            emissionFactor_gC02eqPerKWh: {
                mainLocation:   Math.min(GreenEnergy.EMISSIONS_FACTOR, team.emissionFactor_gC02eqPerKWh.mainLocation),
                remoteLocation: Math.min(GreenEnergy.EMISSIONS_FACTOR, team.emissionFactor_gC02eqPerKWh.remoteLocation),
            },
            // Source: https://www.mobitool.ch/de/tools/mobitool-faktoren-v2-1-25.html?tag=3
            videoconference_gC02eqPerHour: 40
        });
    }

    protected override decorateMachine(machine: IMachine): IMachine {
        return Object.assign(machine, {
            emissionFactor_gC02eqPerkWh: Math.min(GreenEnergy.EMISSIONS_FACTOR, machine.emissionFactor_gC02eqPerkWh)
        });
    }

    protected override decorateUsage(usage: IUsage): IUsage {
        return Object.assign(usage, {
            workplaceEmissionFactor_gC02eqPerKWh: Math.min(GreenEnergy.EMISSIONS_FACTOR, usage.workplaceEmissionFactor_gC02eqPerKWh)
        });
    }
}