import {test} from 'vitest'
import {ProjectEstimator} from "./estimation/ProjectEstimator";
import {BaselineProject} from "./scenario/BaselineProject";
import {allDecorators} from "./decorator/allDecorators";
import {IProject} from "./interfaces/IProject";
import {percentageDecrease} from "./common/testing/percentageDecrease";

test("MasterTest", () => {
    const baseline = new ProjectEstimator().estimate(new BaselineProject());
    const decorated = new ProjectEstimator().estimate(allDecorators.reduce((accumulator: IProject, decorator) => new decorator(accumulator), new BaselineProject()));

    console.log("====");
    console.log(baseline.print("baseline"));
    console.log("====");
    console.log(decorated.print("decorated"));
    console.log("====");
    console.log(`Baseline:   ${baseline.gC02eq.toFixed(0)} gCO2eq`);
    console.log(`Decorated:  ${decorated.gC02eq.toFixed(0)} gC02eq`);
    console.log(`Difference: ${percentageDecrease(baseline.gC02eq, decorated.gC02eq).toFixed(0)} %`);
})