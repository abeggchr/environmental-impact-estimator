import {ProjectDecorator} from "./ProjectDecorator";
import {ITeam} from "../interfaces/ITeam";

/**
 * A 25% shift from individual traffic to public traffic is feasible in a company setting,
 * according to https://www.sciencedirect.com/science/article/pii/S2213624X22000281
 */
export class ReduceIndividualTrafficBy25Percent extends ProjectDecorator {

    private static REDUCTION = 0.25;

    protected override decorateTeam(team: ITeam): ITeam {
        const individualTrafficCombustionDifference = team.commuteModalSplit_percentage.individualTrafficCombustion * ReduceIndividualTrafficBy25Percent.REDUCTION;
        const individualTrafficElectricDifference = team.commuteModalSplit_percentage.individualTrafficElectric * ReduceIndividualTrafficBy25Percent.REDUCTION;

        const individualTrafficCombustion = this.round(team.commuteModalSplit_percentage.individualTrafficCombustion - individualTrafficCombustionDifference);
        const individualTrafficElectric = this.round(team.commuteModalSplit_percentage.individualTrafficElectric - individualTrafficElectricDifference);
        const individualTrafficSlow = team.commuteModalSplit_percentage.individualTrafficSlow;
        const publicTraffic = this.round(1 - (individualTrafficCombustion + individualTrafficElectric + individualTrafficSlow));

        return Object.assign(team, {
            commuteModalSplit_percentage: {
                individualTrafficCombustion,
                individualTrafficElectric,
                individualTrafficSlow,
                publicTraffic
            }
        });
    }

    private round(value: number) {
        return Math.round((value + Number.EPSILON) * 1000) / 1000;
    }

}