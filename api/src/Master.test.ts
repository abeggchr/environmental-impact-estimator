import { test } from 'vitest'
import {ProjectEstimator} from "./estimation/ProjectEstimator";
import {BaselineProject} from "./scenario/BaselineProject";
import {NoDistributedDevelopment} from "./decorator/team/NoDistributedDevelopment";

test("MasterTest", () => {
    const baseline = new ProjectEstimator().estimate(new BaselineProject());
    const decorated = new ProjectEstimator().estimate(new NoDistributedDevelopment(new BaselineProject()));

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
    console.log(`Difference: ${percentageDecrease(decorated.gC02eq, baseline.gC02eq).toFixed(0)} %`);
})