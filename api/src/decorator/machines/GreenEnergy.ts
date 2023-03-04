import {ProjectDecorator} from "../ProjectDecorator";
import {ITeam} from "../../estimation/team/ITeam";
import {AZURE_EMISSIONS_FACTORS_METRIC_TON_PER_KWH} from "@cloud-carbon-footprint/azure";
import {AZURE_REGIONS} from "@cloud-carbon-footprint/azure/dist/lib/AzureRegions";
import {IMachine} from "../../estimation/machine/IMachine";

export class GreenEnergy extends ProjectDecorator {

    private static greenEmissionFactor = AZURE_EMISSIONS_FACTORS_METRIC_TON_PER_KWH[AZURE_REGIONS.EU_SWITZERLAND.name] * 1000 * 1000;

    protected override decorateTeam(team: ITeam): ITeam {
        return Object.assign(team, {
            emissionFactor_gC02eqPerkWh: {
                mainLocation: GreenEnergy.greenEmissionFactor,
                remoteLocation: GreenEnergy.greenEmissionFactor,
            }
        });
    }

    protected override decorateMachine(machine: IMachine): IMachine {
        return Object.assign(machine, {
            emissionFactor_gC02eqPerkWh: GreenEnergy.greenEmissionFactor
        });
    }
}