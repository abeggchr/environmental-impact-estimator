import {ProjectDecorator} from "../ProjectDecorator";
import {ITeam} from "../../estimation/team/ITeam";
import {AZURE_EMISSIONS_FACTORS_METRIC_TON_PER_KWH} from "@cloud-carbon-footprint/azure";
import {IMachine} from "../../estimation/machine/IMachine";

export class GreenEnergy extends ProjectDecorator {

    /**
     * 11.52 g C02 eq per kWh
     *
     * 'switzerland' = AZURE_REGIONS.EU_SWITZERLAND.name, cannot be resolved
     */
    private static greenEmissionFactor = AZURE_EMISSIONS_FACTORS_METRIC_TON_PER_KWH['switzerland'] * 1000 * 1000;

    protected override decorateTeam(team: ITeam): ITeam {
        return Object.assign(team, {
            emissionFactor_gC02eqPerKWh: {
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