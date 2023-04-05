import {ProjectDecorator} from "./ProjectDecorator";
import {ITeam} from "../interfaces/ITeam";
import {IMachine} from "../interfaces/IMachine";
import {IUsage} from "../interfaces/IUsage"
import {EmissionFactor} from "../common/EmissionFactor";

/**
 * Use "green energy" in workplaces, for video conference and in data centre.
 */
export class UseGreenEnergy extends ProjectDecorator {

    protected override decorateTeam(team: ITeam): ITeam {
        return Object.assign(team, {

            emissionFactor_gC02eqPerKWh: {
                mainLocation:   Math.min(EmissionFactor.GREEN_ENERGY_PRODUCTION, team.emissionFactor_gC02eqPerKWh.mainLocation),
                remoteLocation: Math.min(EmissionFactor.GREEN_ENERGY_PRODUCTION, team.emissionFactor_gC02eqPerKWh.remoteLocation),
            },

            videoconference_gC02eqPerHour: EmissionFactor.GREEN_VIDEOCONFERENCE_EMISSION_FACTOR
        });
    }

    protected override decorateMachine(machine: IMachine): IMachine {
        return Object.assign(machine, {
            emissionFactor_gC02eqPerkWh: Math.min(EmissionFactor.CLOUD_EMISSION_FACTOR, machine.emissionFactor_gC02eqPerkWh)
        });
    }

    protected override decorateUsage(usage: IUsage): IUsage {
        return Object.assign(usage, {
            workplaceEmissionFactor_gC02eqPerKWh: Math.min(EmissionFactor.GREEN_ENERGY_PRODUCTION, usage.workplaceEmissionFactor_gC02eqPerKWh),
        });
    }
}