import {describe, expect, test} from 'vitest'
import {testTeam} from "../common/testing/testTeam";
import {testMachine} from "../common/testing/testMachine";
import {UseGreenEnergy} from "./UseGreenEnergy";
import {testUsage} from "../common/testing/testUsage";
import {EatVegetarian} from "./EatVegetarian";

describe('EatVegetarian', () => {
    test('decorates food_gCO2PerLunch', () => {
        const before = testTeam.food_gCO2PerLunch;
        const sut = new EatVegetarian({
            teams: [testTeam],
            machines: [testMachine],
            usage: testUsage
        });

        expect(sut.teams[0].food_gCO2PerLunch).toBeLessThan(before);
    });
});
