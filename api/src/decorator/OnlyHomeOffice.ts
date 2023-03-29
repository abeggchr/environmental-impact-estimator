import {ProjectDecorator} from "./ProjectDecorator";
import {ITeam} from "../interfaces/ITeam";

/**
 * Work only in home office (no commute).
 * Ignores the fact, that when travelling (in a distributed development scenario, people will probably meet in the office.
 */
export class OnlyHomeOffice extends ProjectDecorator {

    protected override decorateTeam(team: ITeam): ITeam {

        return Object.assign(team, {
            workLocation_percentage: {
                home: 1,
                office: 0
            }
        });
    }
}