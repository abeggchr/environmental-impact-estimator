import './App.css'
import {ProjectEstimator} from "./estimation/ProjectEstimator";
import {BaselineProject} from "./scenario/BaselineProject";
import {NoDistributedDevelopment} from "./decorator/team/NoDistributedDevelopment";
import useCopyToClipboard from "./util/useCopyToClipboard";

function App() {
    const baseline = new ProjectEstimator().estimate(new BaselineProject());
    const decorated = new ProjectEstimator().estimate(new NoDistributedDevelopment(new BaselineProject()));

    const [, copy] = useCopyToClipboard();

    function percentageDecrease(oldValue: number, newValue: number) {
        return ((newValue - oldValue) / oldValue) * 100;
    }

    return (
        <div className="App">
            <h1 onClick={() => copy(baseline.print("baseline"))}>Baseline</h1>
            <p>{baseline.gC02eq} gCO2eq</p>

            <h1 onClick={() => copy(decorated.print("decorated"))}>Decorated</h1>
            <p>{decorated.gC02eq} gCO2eq</p>

            <h1>Difference</h1>
            <p>{percentageDecrease(decorated.gC02eq, baseline.gC02eq)} %
                ({decorated.gC02eq - baseline.gC02eq} gC02eq)</p>
        </div>
    )
}

export default App
