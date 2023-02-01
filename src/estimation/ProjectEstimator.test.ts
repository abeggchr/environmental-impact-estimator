import {describe, expect, test, vi} from "vitest";
import {ProjectEstimator} from "./ProjectEstimator";
import {Impact} from "./Impact";
import {testTeam} from "../testing/testTeam";


vi.mock('./team/TeamCalculator', () => {
    const TeamCalculator = vi.fn();
    TeamCalculator.prototype.calculate = vi.fn(() => {
        return new Impact(1, 1);
    })
    return {TeamCalculator};
})

describe("ProjectCalculator", () => {
    test("calls underlying calculators", () => {
        const sut = new ProjectEstimator();
        const actual = sut.calculate({teams: [testTeam]});
        expect(actual.get(testTeam.teamName)).not.toBeUndefined();
    });
});

