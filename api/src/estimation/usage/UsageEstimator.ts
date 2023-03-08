import {Impact} from "../Impact";
import {EmbodiedEmissionsEstimator} from "../common/EmbodiedEmissionsEstimator";
import {IUsage} from "../../interfaces/IUsage";
import {BUSINESS_DAYS_PER_YEAR, HOURS_PER_YEAR} from "../common/Constants";
import {InternetTrafficEstimator} from "./InternetTrafficEstimator";
import {WorkEstimator} from "./WorkEstimator";

export class UsageEstimator {

    constructor(
        private embodiedEmissionsEstimator = new EmbodiedEmissionsEstimator(),
        private internetTrafficEstimator = new InternetTrafficEstimator(),
        private workEstimator = new WorkEstimator()) {
    }

    public estimate(usage: IUsage): Impact {
        const impact = new Impact();
        const duration = (usage.usagePerUserAndBusinessDay_h * BUSINESS_DAYS_PER_YEAR * usage.duration_years) / HOURS_PER_YEAR;
        impact.add("embodiedEmissions", this.embodiedEmissionsEstimator.estimate(usage.users_nr, usage.workplaceEmbodiedEmissions_gC02eq, duration, usage.workplaceExpectedLifespan_years));
        impact.add("internetTraffic", this.internetTrafficEstimator.estimate(usage));
        impact.add("work", this.workEstimator.estimate(usage));
        return impact;
    }
}