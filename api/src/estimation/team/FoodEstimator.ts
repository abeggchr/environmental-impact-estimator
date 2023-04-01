import {ITeam} from "../../interfaces/ITeam";
import {totalWorkingDays} from "./totalWorkingDays";
import {Impact} from "../Impact";

export class FoodEstimator {

    /**
     * Source:
     * [1] https://www.wwf.de/themen-projekte/landwirtschaft/ernaehrung-konsum/essen-wir-das-klima-auf => 2.1 - 0.6kg
     * [2] https://bitsabout.me/de/der-co2-fussabdruck-unserer-nahrungsmittel/ => avg. CH 2 gCO2/kcal, vegan 1 gC02/kcal, meat 3 gCO2/kcal
     * [3] https://www.tk.de/techniker/magazin/ernaehrung/uebergewicht-und-diaet/wie-viele-kalorien-pro-tag-2006758?tkcm=ab => 1900/2500 kcal pro Tag
     */
    static EMISSIONS_PER_LUNCH_GCO2 = 1500;

    estimate(team: ITeam) {
        const gCO2 = totalWorkingDays(team) * FoodEstimator.EMISSIONS_PER_LUNCH_GCO2;

        return new Impact(gCO2, `${totalWorkingDays(team)}d * ${FoodEstimator.EMISSIONS_PER_LUNCH_GCO2}gCO2 [per lunch]`);
    }
}