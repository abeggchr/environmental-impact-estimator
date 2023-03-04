import {describe, expect, test, vi} from "vitest";
import {ProjectEstimator} from "./ProjectEstimator";
import {Impact} from "./Impact";
import {testTeam} from "../testing/testTeam";
import {testMachine} from "../testing/testMachine";


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
        return new Impact(1, "");
    })
    return {MachineEstimator};
})


describe("ProjectEstimator", () => {
    test("calls underlying estimators", () => {
        const sut = new ProjectEstimator();
        const actual = sut.estimate({teams: [testTeam], machines: [testMachine]});
        expect(actual.get(`team`)?.get(testTeam.teamName)).not.toBeUndefined();
        expect(actual.get('machine')?.get(testMachine.machineName)).not.toBeUndefined();
    });
});

