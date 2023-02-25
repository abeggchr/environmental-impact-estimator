import {ProductionMachine} from "./ProductionMachine";

/**
 * The web server uses a "D16s_v4" Azure VM (16 vCPU, Ice Lake processor, 64GB RAM).
 */
export class WebProductionMachine extends ProductionMachine {

    constructor() {
        super('D2s – D64s v4', 'D16s v4');
    }

    machineName = "web-production";
}