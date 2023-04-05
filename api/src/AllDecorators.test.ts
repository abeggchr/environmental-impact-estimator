import {test} from 'vitest'
import {ProjectEstimator} from "./estimation/ProjectEstimator";
import {BaselineProject} from "./scenario/BaselineProject";
import {allDecorators} from "./decorator/allDecorators";
import {IProject} from "./interfaces/IProject";
import {logImpacts} from "./common/testing/logImpacts";

test("compare baseline and baseline with all decorators applied", () => {
    const baseline = new ProjectEstimator().estimate(new BaselineProject());
    const decorated = new ProjectEstimator().estimate(allDecorators.reduce((accumulator: IProject, decorator) => new decorator(accumulator), new BaselineProject()));
    logImpacts(baseline, decorated);
})