import {ProjectDecorator} from "../ProjectDecorator";
import {ITeam} from "../../estimation/team/ITeam";

export class NoDistributedDevelopment extends ProjectDecorator {
    protected override decorateTeam(team: ITeam): ITeam {
        const decorated = Object.assign(team, {
            teamDistribution_nr: {
                mainLocation: team.teamDistribution_nr.mainLocation + team.teamDistribution_nr.remoteLocation,
                remoteLocation: 0
            }
        });

        return decorated;
    }
}