import {ProjectDecorator} from "../ProjectDecorator";
import {ITeam} from "../../calculation/team/ITeam";

export class NoDistributedDevelopment extends ProjectDecorator {
    protected override decorateTeam(team: ITeam): ITeam {
        let out = Object.assign(team, {
            distribution_percentage: {
                mainLocation: 1,
                remoteLocation: 0
            }
        });

        return out;
    }
}