import {describe, expect, test, vi} from "vitest";
import {ProjectEstimator} from "./ProjectEstimator";
import {Impact} from "./Impact";
import {testTeam} from "../interfaces/testTeam";
import {testMachine} from "../interfaces/testMachine";
import {testUsage} from "../interfaces/testUsage";


vi.mock('./team/TeamEstimator', () => {
    const TeamEstimator = vi.fn();
    TeamEstimator.prototype.estimate = vi.fn(() => {
        return new Impact(1, "");
    })
    return {TeamEstimator};
})

vi.mock('./machine/MachineEstimator', () => {
    const MachineEstimator = vi.fn();
    MachineEstimator.prototype.estimate = vi.fn(() => {
        return new Impact(2, "");
    })
    return {MachineEstimator};
})

vi.mock('./usage/UsageEstimator', () => {
    const UsageEstimator = vi.fn();
    UsageEstimator.prototype.estimate = vi.fn(() => {
        return new Impact(3, "");
    })
    return {UsageEstimator};
})


describe("ProjectEstimator", () => {
    test("calls underlying estimators", () => {
        const sut = new ProjectEstimator();
        const actual = sut.estimate({teams: [testTeam], machines: [testMachine], usage: testUsage});
        expect(actual.get(`team`)?.get(testTeam.teamName)).not.toBeUndefined();
        expect(actual.get('machine')?.get(testMachine.machineName)).not.toBeUndefined();
        expect(actual.get('usage')).not.toBeUndefined();
    });
});

