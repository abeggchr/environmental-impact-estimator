import {ProjectDecorator} from "./ProjectDecorator";
import {ITeam} from "../interfaces/ITeam";
import {IMachine} from "../interfaces/IMachine";
import {IUsage} from "../interfaces/IUsage"

export class ExtendHardwareLifespanBy1Year extends ProjectDecorator {

    private static EXTENSION = 1;

    protected override decorateTeam(team: ITeam): ITeam {
        return Object.assign(team, {
            workplaceExpectedLifespan_years: team.workplaceExpectedLifespan_years + ExtendHardwareLifespanBy1Year.EXTENSION
        });
    }

    protected override decorateMachine(machine: IMachine): IMachine {
        return Object.assign(machine, {
            expectedLifespan_years: machine.expectedLifespan_years + ExtendHardwareLifespanBy1Year.EXTENSION
        });
    }

    protected override decorateUsage(usage: IUsage): IUsage {
        return Object.assign(usage, {
            workplaceExpectedLifespan_years: usage.workplaceExpectedLifespan_years + ExtendHardwareLifespanBy1Year.EXTENSION
        });
    }
}