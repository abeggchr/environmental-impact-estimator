import './App.css'
import {ProjectCalculator} from "./calculation/ProjectCalculator";
import {BaselineProject} from "./scenario/BaselineProject";
import {NoDistributedDevelopment} from "./decorator/team/NoDistributedDevelopment";
import useCopyToClipboard from "./useCopyToClipboard";

function App() {
    const baseline = new ProjectCalculator().calculate(new BaselineProject());
    const decorated = new ProjectCalculator().calculate(new NoDistributedDevelopment(new BaselineProject()));

    const [value, copy] = useCopyToClipboard();

    function percentageDecrease(oldValue: number, newValue: number) {
        return ((newValue - oldValue) / oldValue) * 100;
    }

    return (
        <div className="App">
            <h1 onClick={() => copy(baseline.print("baseline"))}>Baseline</h1>
            <p>{baseline.kWh} kWh</p>
            <p>{baseline.gC02eq} gCO2eq</p>

            <h1 onClick={() => copy(decorated.print("decorated"))}>Decorated</h1>
            <p>{decorated.kWh} kWh</p>
            <p>{decorated.gC02eq} gCO2eq</p>

            <h1>Difference</h1>
            <p>{percentageDecrease(decorated.kWh, baseline.kWh)} % ({decorated.kWh - baseline.kWh} kWh)</p>
            <p>{percentageDecrease(decorated.gC02eq, baseline.gC02eq)} %
                ({decorated.gC02eq - baseline.gC02eq} gC02eq)</p>
        </div>
    )
}

export default App
