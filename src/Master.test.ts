import { test } from 'vitest'
import {ProjectEstimator} from "./estimation/ProjectEstimator";
import {BaselineProject} from "./scenario/BaselineProject";
import {NoDistributedDevelopment} from "./decorator/team/NoDistributedDevelopment";
test("MasterTest", () => {
    const baseline = new ProjectEstimator().calculate(new BaselineProject());
    const decorated = new ProjectEstimator().calculate(new NoDistributedDevelopment(new BaselineProject()));

    function percentageDecrease(oldValue: number, newValue: number) {
        return ((newValue - oldValue) / oldValue) * 100;
    }

    console.log("====");
    console.log(baseline.print("baseline"));
    console.log("====");
    console.log(decorated.print("decorated"));
    console.log("====");
    console.log(`Baseline:   ${baseline.kWh.toFixed(0)} kWh / ${baseline.gC02eq.toFixed(0)} gCO2eq`);
    console.log(`Decorated:  ${decorated.kWh.toFixed(0)} kWh / ${decorated.gC02eq.toFixed(0)} gC02eq`);
    console.log(`Difference: ${percentageDecrease(decorated.kWh, baseline.kWh).toFixed(0)} % / ${percentageDecrease(decorated.gC02eq, baseline.gC02eq).toFixed(0)} %`);
})