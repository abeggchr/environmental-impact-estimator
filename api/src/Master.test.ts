import { test } from 'vitest'
import {ProjectEstimator} from "./estimation/ProjectEstimator";
import {BaselineProject} from "./scenario/BaselineProject";
import {allDecorators} from "./decorator/allDecorators";
import {IProject} from "./interfaces/IProject";

test("MasterTest", () => {
    const baseline = new ProjectEstimator().estimate(new BaselineProject());

    let decoratedProject: IProject= new BaselineProject();
    allDecorators.forEach(d => decoratedProject = new d(decoratedProject));
    const decorated = new ProjectEstimator().estimate(decoratedProject);

    function percentageDecrease(oldValue: number, newValue: number) {
        return ((newValue - oldValue) / oldValue) * 100;
    }

    console.log("====");
    console.log(baseline.print("baseline"));
    console.log("====");
    console.log(decorated.print("decorated"));
    console.log("====");
    console.log(`Baseline:   ${baseline.gC02eq.toFixed(0)} gCO2eq`);
    console.log(`Decorated:  ${decorated.gC02eq.toFixed(0)} gC02eq`);
    console.log(`Difference: ${percentageDecrease(baseline.gC02eq, decorated.gC02eq).toFixed(0)} %`);
})