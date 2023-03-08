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
     * 9000 users, 1h usage per day, 3 requests per minute and user, 50kb internal traffic to db server per request
     */
    traffic_gbPerBusinessDay = 9000 * 3 * 60 * 0.00005;
}