import {ProjectDecorator} from "./ProjectDecorator";
import {IUsage} from "../interfaces/IUsage";

export class ReduceInternetTrafficBy25Percent extends ProjectDecorator {

    private static REDUCTION = 0.25;

    protected override decorateUsage(usage: IUsage): IUsage {
        return Object.assign(usage, {
            initialRequest_gb: this.round(usage.initialRequest_gb * (1 - ReduceInternetTrafficBy25Percent.REDUCTION)),
            additionalRequest_gb: this.round(usage.additionalRequest_gb * (1 - ReduceInternetTrafficBy25Percent.REDUCTION)),
        });
    }

    private round(value: number) {
        return Math.round((value + Number.EPSILON) * 1000) / 1000;
    }
}