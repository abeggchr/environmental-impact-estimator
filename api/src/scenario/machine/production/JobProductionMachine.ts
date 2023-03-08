import {ProductionMachine} from "./ProductionMachine";

/**
 * The job server uses a VM "F16s v2" Azure VM (16 vCPU, 32GB RAM, 128GB temp storage)
 */
export class JobProductionMachine extends ProductionMachine {

    constructor() {
        super('Fsv2-series', 'F16s v2');
    }

    machineName = "job-production";

    /**
     * 620 db queries / second [peak]
     * 50kb per query
     */
    traffic_gbPerBusinessDay = 0.00005 * 310 * (12 + 3);
}