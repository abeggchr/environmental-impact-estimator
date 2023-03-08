import {ProductionMachine} from "./ProductionMachine";

/**
 * The db server uses a VM "E8as v5" Azure VM (8 vCPU, 64GB RAM) with Premium SSD P15 (256 GB)
 */
export class DbProductionMachine extends ProductionMachine {

    constructor() {
        super('E2as – E96as v5', 'E8as v5');
    }

    machineName = "db-production";

    ssdStorage_gb = 256;

    /**
     * traffic to DB server is covered in client servers
     */
    traffic_gbPerBusinessDay = 0;
}