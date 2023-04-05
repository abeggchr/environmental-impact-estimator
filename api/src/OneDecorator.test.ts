import {test} from 'vitest'
import {ProjectEstimator} from "./estimation/ProjectEstimator";
import {BaselineProject} from "./scenario/BaselineProject";
import {logImpacts} from "./common/testing/logImpacts";
import {ReduceCoresAndMemoryBy50Percent} from "./decorator/ReduceCoresAndMemoryBy50Percent";

test("compare baseline and baseline with one decorators applied", () => {
    const baseline = new ProjectEstimator().estimate(new BaselineProject());
    const decorated = new ProjectEstimator().estimate(new ReduceCoresAndMemoryBy50Percent(new BaselineProject()));
    logImpacts(baseline, decorated);
})