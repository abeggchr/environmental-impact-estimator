import {ProjectDecorator} from "./ProjectDecorator";
import {IMachine} from "../interfaces/IMachine";
import {Machine, SeriesName, UsageType} from "../scenario/machine/Machine";
import {VIRTUAL_MACHINE_TYPE_SERIES_MAPPING} from "@cloud-carbon-footprint/azure/dist/lib/VirtualMachineTypes";
import _ from "lodash";

export class ReduceMemoryBy50Percent extends ProjectDecorator {

    protected decorateMachine(machine: IMachine): IMachine {
        return Object.assign(HalfMemoryMachine.create(machine as Machine), {
            hourlyCpuUtilizationOverNonBusinessDay_percentage: machine.hourlyCpuUtilizationOverNonBusinessDay_percentage.map(u => u * 2),
            hourlyCpuUtilizationOverBusinessDay_percentage: machine.hourlyCpuUtilizationOverBusinessDay_percentage.map(u => u * 2)
        });
    }
}

class HalfMemoryMachine extends Machine {

    /**
     * Searches for a half as powerful usageType in the same series.
     */
    static create(machine: Machine): IMachine {
        const seriesName = (machine as Machine).seriesName;
        const usageType = (machine as Machine).usageType;
        if (!seriesName || !usageType) {
            throw new Error(`not implemented for ${machine.machineName}, only implemented for instances of type Machine`);
        }

        const newMemory_gb = machine.memory_gb / 2;
        let newUsageTypeCandidates = [] as { usageType: UsageType, vcpu: number }[];
        const series = VIRTUAL_MACHINE_TYPE_SERIES_MAPPING[seriesName];
        _.forOwn(series, (value, usageType) => {
            if (newMemory_gb === value[Machine.VIRTUAL_MACHINE_INDEX.MEMORY]) {
                newUsageTypeCandidates.push({
                    usageType: usageType as UsageType,
                    vcpu: value[Machine.VIRTUAL_MACHINE_INDEX.VCPU]
                });
            }
        });
        if (!newUsageTypeCandidates.length) {
            throw new Error(`no usageType with ${newMemory_gb} gb memory in series ${seriesName}`);
        }

        // take the candidate with the same number of vcpus
        let newUsageType = newUsageTypeCandidates.find(m => m.vcpu === machine.virtualCPUs_number);
        if (!newUsageType) {
            // take the candiate with the most number of vcpus
            newUsageType = newUsageTypeCandidates.reduce((previous, current) => previous.vcpu > current.vcpu ? previous : current);
        }

        return new HalfMemoryMachine(seriesName, newUsageType.usageType, machine);
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
    instances_number = this.original.instances_number;
    traffic_gbPerBusinessDay = this.original.traffic_gbPerBusinessDay;
    hasHotStandby_bool =this.original.hasHotStandby_bool;
}