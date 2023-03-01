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
     * 1mb traffic per request
     * 60 requests per second (during peak hours, otherwise 30)
     * 60mb/s = 3600mb/min = 216000mb/h = 216gb/h
     */
    hourlyTrafficOverAverageDay_gb = [0, 0, 0, 0, 0, 0, 108, 108, 108, 108, 108, 216, 216, 216, 108, 108, 108, 108, 0, 0, 0, 0, 0, 0];
}