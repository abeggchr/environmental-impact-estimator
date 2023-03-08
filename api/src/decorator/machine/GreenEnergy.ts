import {ProjectDecorator} from "../ProjectDecorator";
import {ITeam} from "../../estimation/team/ITeam";
import {AZURE_EMISSIONS_FACTORS_METRIC_TON_PER_KWH} from "@cloud-carbon-footprint/azure";
import {IMachine} from "../../estimation/machine/IMachine";
import {IUsage} from "../../estimation/usage/IUsage";

export class GreenEnergy extends ProjectDecorator {

    private static EMISSIONS_FACTOR = AZURE_EMISSIONS_FACTORS_METRIC_TON_PER_KWH['switzerland'] * 1000 * 1000;

    protected override decorateTeam(team: ITeam): ITeam {
        return Object.assign(team, {
            emissionFactor_gC02eqPerKWh: {
                mainLocation:   Math.min(GreenEnergy.EMISSIONS_FACTOR, team.emissionFactor_gC02eqPerKWh.mainLocation),
                remoteLocation: Math.min(GreenEnergy.EMISSIONS_FACTOR, team.emissionFactor_gC02eqPerKWh.remoteLocation),
            }
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