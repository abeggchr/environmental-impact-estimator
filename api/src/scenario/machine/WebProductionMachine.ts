import {ProductionMachine} from "./ProductionMachine";

/**
 * The web server uses a "D16s_v4" Azure VM (16 vCPU, Ice Lake processor, 64GB RAM).
 */
export class WebProductionMachine extends ProductionMachine {

    constructor() {
        super('D2s – D64s v4', 'D16s v4');
    }

    machineName = "web-production";

    /**
     * initial request 3.5mb (one for every user) / additional requests during usage 100kb
     * 9000 users, 1h usage per day, 3 requests per minute and user
     * = 193.5 gb / day
     */
    traffic_gbPerBusinessDay = 9000 * (0.0035 + 3 * 60 * 0.0001);
}