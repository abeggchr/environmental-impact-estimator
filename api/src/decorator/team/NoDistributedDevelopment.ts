import {ProjectDecorator} from "../ProjectDecorator";
import {ITeam} from "../../estimation/team/ITeam";

export class NoDistributedDevelopment extends ProjectDecorator {
    protected override decorateTeam(team: ITeam): ITeam {
        return Object.assign(team, {
            teamDistribution_nr: {
                mainLocation: team.teamDistribution_nr.mainLocation + team.teamDistribution_nr.remoteLocation,
                remoteLocation: 0
            }
        });
    }
}