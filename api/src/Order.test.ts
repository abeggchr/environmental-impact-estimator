import {test} from 'vitest'
import {ProjectEstimator} from "./estimation/ProjectEstimator";
import {BaselineProject} from "./scenario/BaselineProject";
import {NoDistributedDevelopment} from "./decorator/NoDistributedDevelopment";
import {UseGreenEnergy} from "./decorator/UseGreenEnergy";
import {Cloud} from "./decorator/Cloud";
import {ReduceIndividualTrafficBy25Percent} from "./decorator/ReduceIndividualTrafficBy25Percent";
import {DoubleUtilization} from "./decorator/DoubleUtilization";
import {ExtendHardwareLifespanBy1Year} from "./decorator/ExtendHardwareLifespanBy1Year";
import {NoZombieServers} from "./decorator/NoZombieServers";
import {ReduceInternetTrafficBy25Percent} from "./decorator/ReduceInternetTrafficBy25Percent";
import {ScaleToZero} from "./decorator/ScaleToZero";
import {OnlyHomeOffice} from "./decorator/OnlyHomeOffice";

test("Ordering", () => {
    function percentageDecrease(oldValue: number, newValue: number) {
        return ((newValue - oldValue) / oldValue) * 100;
    }

    const baseline = new ProjectEstimator().estimate(new BaselineProject());

    const decorators = [Cloud, DoubleUtilization, ExtendHardwareLifespanBy1Year, NoDistributedDevelopment, NoZombieServers, OnlyHomeOffice, ReduceIndividualTrafficBy25Percent, ReduceInternetTrafficBy25Percent, ScaleToZero, UseGreenEnergy];

    const estimations = decorators
        .map(c => {
            return {
                name: c.name,
                gCO2eq: new ProjectEstimator().estimate(new c(new BaselineProject())).gC02eq
            }
        })
        .map(v => {
            return {...v, decrease: percentageDecrease(baseline.gC02eq, v.gCO2eq)}
        })
        .sort((a, b) => a.gCO2eq - b.gCO2eq);

    console.table(estimations);
})

