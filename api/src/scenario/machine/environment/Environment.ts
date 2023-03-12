import {IMachine} from "../../../interfaces/IMachine";

/**
 * An environment consists of multiple machines.
 *
 * If two machines with a replication factor of 2 are passed in, the replication-factor of 1 for the environment means, that there are 4 vms running.
 */
export abstract class Environment implements IMachine {


    protected constructor(private machines: IMachine[], private adjustReplicationFactor: (machine:IMachine) => number) {
    }

    abstract machineName: string;
    abstract duration_years: number;
    abstract hourlyCpuUtilizationOverBusinessDay_percentage: number[];


    cpuUtilizationOnNonBusinessDay_percentage = 0;
    dailyRunning_hours = 24;
    embodiedEmissions_gC02eq = this.sum("embodiedEmissions_gC02eq");
    emissionFactor_gC02eqPerkWh = this.avg('emissionFactor_gC02eqPerkWh');
    expectedLifespan_years= this.avg('expectedLifespan_years');
    hddCoefficient_whPerTBh= this.avg('expectedLifespan_years');
    hddStorage_gb = this.sum("hddStorage_gb");
    isPhysicalMachine = false;
    largestInstanceVirtualCPUs_number = this.avg('largestInstanceVirtualCPUs_number');
    maxWatts_W = this.avg('maxWatts_W');
    memoryCoefficient_kWhPerGb = this.avg('memoryCoefficient_kWhPerGb');
    memory_gb = this.avg('memory_gb');
    minWatts_W = this.avg('minWatts_W');
    networkingCoefficient_kWhPerGb = this.avg('networkingCoefficient_kWhPerGb');
    powerUsageEffectiveness_factor= this.avg('powerUsageEffectiveness_factor');
    replication_factor = 1;
    ssdCoefficient_whPerTBh = this.avg('ssdCoefficient_whPerTBh');
    ssdStorage_gb = this.sum("ssdStorage_gb");
    traffic_gbPerBusinessDay = this.sum('traffic_gbPerBusinessDay');
    virtualCPUs_number = this.sum('virtualCPUs_number');
    zombieServers_percentage = this.avg('zombieServers_percentage');

    private sum(key: keyof IMachine) {
        return this.machines.reduce((accumulator, machine) => {return accumulator + (this.adjustReplicationFactor(machine) * (machine[key] as number))}, 0);
    }

    private avg(key: keyof IMachine) {
        return this.sum(key) / this.machines.length;
    }


}