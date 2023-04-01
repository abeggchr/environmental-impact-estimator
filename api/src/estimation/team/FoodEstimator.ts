import {ITeam} from "../../interfaces/ITeam";
import {totalWorkingDays} from "./totalWorkingDays";
import {Impact} from "../Impact";

export class FoodEstimator {

    estimate(team: ITeam) {
        const gCO2 = totalWorkingDays(team) * team.food_gCO2PerLunch;

        return new Impact(gCO2, `${totalWorkingDays(team)}d * ${team.food_gCO2PerLunch}gCO2 [per lunch]`);
    }
}