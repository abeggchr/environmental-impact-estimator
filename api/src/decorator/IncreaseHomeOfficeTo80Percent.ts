import {ProjectDecorator} from "./ProjectDecorator";
import {ITeam} from "../interfaces/ITeam";

/**
 * Work only in home office on 80% of the working days.
 * Ignores the fact, that when travelling (in a distributed development scenario, people will probably meet in the office.
 */
export class IncreaseHomeOfficeTo80Percent extends ProjectDecorator {

    protected override decorateTeam(team: ITeam): ITeam {

        return Object.assign(team, {
            workLocation_percentage: {
                home: 0.8,
                office: 0.2
            }
        });
    }
}