import {ProjectDecorator} from "./ProjectDecorator";
import {ITeam} from "../interfaces/ITeam";
import {IMachine} from "../interfaces/IMachine";
import {IUsage} from "../interfaces/IUsage"
import {EmissionFactor} from "../common/testing/EmissionFactor";

export class EatVegetarian extends ProjectDecorator {

    protected override decorateTeam(team: ITeam): ITeam {
        return Object.assign(team, {
            food_gCO2PerLunch: team.food_gCO2PerLunch * 0.66
        });
    }
}