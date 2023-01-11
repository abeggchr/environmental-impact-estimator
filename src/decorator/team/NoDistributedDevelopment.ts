import {TeamDecorator} from "./TeamDecorator";

export class NoDistributedDevelopment extends TeamDecorator {
    get distribution_percentage() {
        return {
            mainLocation: 1,
            remoteLocation: 0,
        }
    }
}