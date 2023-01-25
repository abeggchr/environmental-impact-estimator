import {IEnvironment} from "../../calculation/environment/IEnvironment";

export abstract class Environment implements IEnvironment {

    abstract environmentName: string;
    /**
     * Quote: "the data shows that about thirty percent of the virtual machines [...] were [...] comatose"
     * Source: https://www.anthesisgroup.com/wp-content/uploads/2019/11/Comatose-Servers-Redux-2017.pdf
     */
    zombieServers_percentage = 0.3;
    /**
     * 4 years according to `AzureFootprintCalculationConstants` in the cloud-carbon-footprint tool
     */
    serverExpectedLifespan_years = 4;

    abstract utilization_percentage(hour: number): number;
}