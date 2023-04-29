import {test} from 'vitest'
import {ProjectEstimator} from "./estimation/ProjectEstimator";
import {BaselineProject} from "./scenario/BaselineProject";
import {percentageDecrease} from "./common/testing/percentageDecrease";
import {IgnoreUsageAspects} from "./decorator/IgnoreUsageAspects";
import {ReduceIndividualTrafficBy25Percent} from "./decorator/ReduceIndividualTrafficBy25Percent";
import {ReduceInternetTrafficBy25Percent} from "./decorator/ReduceInternetTrafficBy25Percent";
import {ExtendHardwareLifespanBy1Year} from "./decorator/ExtendHardwareLifespanBy1Year";
import {ScaleToZero} from "./decorator/ScaleToZero";
import {UseCloud} from "./decorator/UseCloud";
import {ReduceCoresAndMemoryBy50Percent} from "./decorator/ReduceCoresAndMemoryBy50Percent";
import {NoZombieServers} from "./decorator/NoZombieServers";
import {NoHotStandby} from "./decorator/NoHotStandby";
import {NoDistributedDevelopment} from "./decorator/NoDistributedDevelopment";
import {UseContinuousIntegrationAsService} from "./decorator/UseContinuousIntegrationAsService";
import {IncreaseHomeOfficeTo60Percent} from "./decorator/IncreaseHomeOfficeTo60Percent";
import {UseGreenEnergy} from "./decorator/UseGreenEnergy";
import {EatVegetarian} from "./decorator/EatVegetarian";
import {IProject} from "./interfaces/IProject";
import {ApplyCarbonAwareness} from "./decorator/ApplyCarbonAwareness";


type EstimationWithDecrease = {
    name: string,
    gCO2eq: number,
    relativeDecrease: number,
    absoluteDecrease: number,
    deltaAbsoluteDecrease: number,
}

test("Story", () => {

    const estimations =[];
    let previousProject: IProject = new IgnoreUsageAspects(new BaselineProject());
    const baselineEstimation = new ProjectEstimator().estimate(previousProject);
    let previousEstimation = baselineEstimation;
    estimations.push({name: "baseline", gCO2eq: previousEstimation.gC02eq, absoluteDecrease: 0, deltaAbsoluteDecrease: 0, relativeDecrease: 0});

    // strict order
    const orderedDecorators_ = [
        NoDistributedDevelopment,
        ReduceCoresAndMemoryBy50Percent,
        IncreaseHomeOfficeTo60Percent,
        EatVegetarian,
        UseCloud,
        ReduceInternetTrafficBy25Percent,
        UseContinuousIntegrationAsService,
        ExtendHardwareLifespanBy1Year,
        NoZombieServers,
        UseGreenEnergy,
        NoHotStandby,
        ScaleToZero,
        ReduceIndividualTrafficBy25Percent,
        ApplyCarbonAwareness];

    // story order
    const orderedDecorators = [
        // big chunks
        NoDistributedDevelopment,
        ReduceCoresAndMemoryBy50Percent,

        // 5-10%
        IncreaseHomeOfficeTo60Percent,
        EatVegetarian,
        UseCloud,
        ReduceInternetTrafficBy25Percent,
        UseContinuousIntegrationAsService,

        // around 2%
        ExtendHardwareLifespanBy1Year,
        NoZombieServers,

        // around 1%
        UseGreenEnergy,
        NoHotStandby,
        ScaleToZero];

    for (let i = 0; i < orderedDecorators.length; i++) {
        const decorator = orderedDecorators[i];
        const project = new decorator(previousProject);
        const estimation = new ProjectEstimator().estimate(project);
        const absoluteDecrease = percentageDecrease(baselineEstimation.gC02eq, estimation.gC02eq);
        estimations.push({
            name: "+" + decorator.name.replace("_", ""),
            gCO2eq: previousEstimation.gC02eq,
            relativeDecrease: percentageDecrease(previousEstimation.gC02eq, estimation.gC02eq),
            absoluteDecrease: absoluteDecrease,
            deltaAbsoluteDecrease: estimations[estimations.length-1].absoluteDecrease - absoluteDecrease,
        });

        previousProject = project;
        previousEstimation = estimation;
    }

    console.table(estimations);
})

