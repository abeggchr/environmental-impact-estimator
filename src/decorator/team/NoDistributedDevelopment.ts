import {ProjectDecorator} from "../ProjectDecorator";
import {ITeam} from "../../calculation/team/ITeam";

export class NoDistributedDevelopment extends ProjectDecorator {
    protected override decorateTeam(team: ITeam): ITeam {
        let out = Object.assign(team, {
            teamDistribution_nr: {
                mainLocation: team.teamDistribution_nr.mainLocation + team.teamDistribution_nr.remoteLocation,
                remoteLocation: 0
            }
        });

        return out;
    }
}