import {ProjectDecorator} from "./ProjectDecorator";
import {IMachine} from "../interfaces/IMachine";
import {Machine, SeriesName, UsageType} from "../scenario/machine/Machine";
import {VIRTUAL_MACHINE_TYPE_SERIES_MAPPING} from "@cloud-carbon-footprint/azure/dist/lib/VirtualMachineTypes";
import _ from "lodash";

export class DoubleUtilization extends ProjectDecorator {

    protected decorateMachine(machine: IMachine): IMachine {
        return Object.assign(HalfPowerfulMachine.create(machine as Machine), {
            hourlyCpuUtilizationOverNonBusinessDay_percentage: machine.hourlyCpuUtilizationOverNonBusinessDay_percentage.map(u => u * 2),
            hourlyCpuUtilizationOverBusinessDay_percentage: machine.hourlyCpuUtilizationOverBusinessDay_percentage.map(u => u * 2)
        });
    }
}

class HalfPowerfulMachine extends Machine {

    /**
     * Searches for a half as powerful usageType in the same series.
     */
    static create(machine: Machine): IMachine {
        const seriesName = (machine as Machine).seriesName;
        const usageType = (machine as Machine).usageType;
        if (!seriesName || !usageType) {
            throw new Error(`not implemented for ${machine.machineName}, only implemented for instances of type Machine`);
        }

        const newVirtualCPUs_number = machine.virtualCPUs_number / 2;
        let newUsageTypeCandates = [] as { usageType: UsageType, memory: number }[];
        const series = VIRTUAL_MACHINE_TYPE_SERIES_MAPPING[seriesName];
        _.forOwn(series, (value, usageType) => {
            if (newVirtualCPUs_number === value[Machine.VIRTUAL_MACHINE_INDEX.VCPU]) {
                newUsageTypeCandates.push({
                    usageType: usageType as UsageType,
                    memory: value[Machine.VIRTUAL_MACHINE_INDEX.MEMORY]
                });
            }
        });
        if (!newUsageTypeCandates.length) {
            throw new Error(`no usageType with ${newVirtualCPUs_number} vCPUs in series ${seriesName}`);
        }

        const newUsageType = newUsageTypeCandates.reduce((previous, current) => previous.memory > current.memory ? previous : current);

        return new HalfPowerfulMachine(seriesName, newUsageType.usageType, machine);
    }

    constructor(public seriesName: SeriesName, public usageType: UsageType, private original: Machine) {
        super(seriesName, usageType);
    }

    duration_years = this.original.duration_years;
    hddStorage_gb = this.original.hddStorage_gb;
    ssdStorage_gb = this.original.ssdStorage_gb;
    hourlyCpuUtilizationOverBusinessDay_percentage = this.original.hourlyCpuUtilizationOverBusinessDay_percentage;
    hourlyCpuUtilizationOverNonBusinessDay_percentage = this.original.hourlyCpuUtilizationOverNonBusinessDay_percentage;
    machineName = this.original.machineName;
    replication_factor = this.original.replication_factor;
    traffic_gbPerBusinessDay = this.original.traffic_gbPerBusinessDay;
}