import {ProjectDecorator} from "./ProjectDecorator";
import {ITeam} from "../interfaces/ITeam";
import {IMachine} from "../interfaces/IMachine";
import {IUsage} from "../interfaces/IUsage"
import {EmissionFactor} from "../common/EmissionFactor";

export class IgnoreUsageAspects extends ProjectDecorator {

    protected override decorateUsage(usage: IUsage): IUsage {
        return Object.assign(usage, {
            workplaceEmbodiedEmissions_gC02eq: 0, // ignore embodied emissions
            workplaceEmissionFactor_gC02eqPerKWh: 0 // ignore electricity consumption
        });
    }
}