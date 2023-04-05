import {test} from 'vitest'
import {ProjectEstimator} from "./estimation/ProjectEstimator";
import {BaselineProject} from "./scenario/BaselineProject";
import {allDecorators} from "./decorator/allDecorators";
import {percentageDecrease} from "./common/testing/percentageDecrease";
import {IgnoreUsageAspects} from "./decorator/IgnoreUsageAspects";

test("Ordering", () => {

    const baseline = new ProjectEstimator().estimate(new IgnoreUsageAspects(new BaselineProject()));

    const estimations = allDecorators
        .map(c => {
            return {
                name: c.name.replace("_",""),
                gCO2eq: new ProjectEstimator().estimate(new c(new IgnoreUsageAspects(new BaselineProject()))).gC02eq
            }
        })
        .map(v => {
            return {...v, decrease: percentageDecrease(baseline.gC02eq, v.gCO2eq)}
        })
        .sort((a, b) => a.gCO2eq - b.gCO2eq);

    console.table(estimations);
})

