import './App.css'
import {ProjectCalculator} from "./calculation/ProjectCalculator";
import {BaselineProject} from "./scenario/BaselineProject";
import {NoDistributedDevelopment} from "./decorator/team/NoDistributedDevelopment";

function App() {
    const baseline = new ProjectCalculator().calculate(new BaselineProject());
    const decorated = new ProjectCalculator().calculate(new NoDistributedDevelopment(new BaselineProject()));

    return (
        <div className="App">
            <h1>Baseline</h1>
            <p>{baseline.kWh} kWh</p>
            <p>{baseline.gC02eq} gCO2eq</p>

            <h1>Decorated</h1>
            <p>{decorated.kWh} kWh</p>
            <p>{decorated.gC02eq} gCO2eq</p>
        </div>
    )
}

export default App
