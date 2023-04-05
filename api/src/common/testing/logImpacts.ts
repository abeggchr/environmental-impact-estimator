import {Impact} from "../../estimation/Impact";
import {percentageDecrease} from "./percentageDecrease";

export function logImpacts(baseline: Impact, decorated: Impact) {
    console.log("====");
    console.log(baseline.print("baseline"));
    console.log("====");
    console.log(decorated.print("decorated"));
    console.log("====");
    console.log(`Baseline:   ${baseline.gC02eq.toFixed(0)} gCO2eq`);
    console.log(`Decorated:  ${decorated.gC02eq.toFixed(0)} gC02eq`);
    console.log(`Difference: ${percentageDecrease(baseline.gC02eq, decorated.gC02eq).toFixed(0)} %`);
}