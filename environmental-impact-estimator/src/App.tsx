import './App.css'
import {ProjectCalculator} from "./calculation/ProjectCalculator";
import {Project} from "./scenario/Project";

function App() {
    const impact = new ProjectCalculator().calculate(new Project());

    return (
        <div className="App">
            <h1>Baseline</h1>
            <p>{impact.kWh} kWh</p>
            <p>{impact.gC02eq} gCO2eq</p>
        </div>
    )
}

export default App
